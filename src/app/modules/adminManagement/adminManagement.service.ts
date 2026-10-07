import argon2 from 'argon2';
import crypto from 'crypto';
import { Admin } from '../auth/auth.model.js';
import { AppError } from '../../errors/AppError.js';
import { sendAdminCredentialsEmail } from '../../utils/email/email.service.js';
import { QueryBuilder } from '../../utils/queryBuilder.js';

const createAdmin = async (payload: { name: string; email: string }) => {
  const existingAdmin = await Admin.findOne({ email: payload.email.toLowerCase() });
  if (existingAdmin) {
    throw new AppError(400, 'Admin with this email already exists', 'VALIDATION_ERROR');
  }

  // Generate an 8-character random password
  const generatedPassword = crypto.randomBytes(4).toString('hex');
  const passwordHash = await argon2.hash(generatedPassword);

  const newAdmin = await Admin.create({
    name: payload.name,
    email: payload.email.toLowerCase(),
    passwordHash,
    role: 'ADMIN',
    isActive: true,
  });

  // Send email with credentials
  await sendAdminCredentialsEmail({
    name: newAdmin.name,
    email: newAdmin.email,
    password: generatedPassword,
  });

  // Strip passwordHash before returning
  const adminObj = newAdmin.toObject();
  delete (adminObj as any).passwordHash;

  return adminObj;
};

const getAllAdmins = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } }), query)
    .search(['name', 'email'])
    .filterByCategory(['role', 'isActive'])
    .sort()
    .paginate()
    .fields();

  const data = await adminQuery.modelQuery;
  const metaQuery = new QueryBuilder(Admin.find({ role: { $in: ['ADMIN', 'SUPER_ADMIN'] } }), query).search(['name', 'email']).filterByCategory(['role', 'isActive']);
  const total = await metaQuery.modelQuery.countDocuments();
  
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const totalPages = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
    data,
  };
};

const blockAdmin = async (id: string, payload: { isActive: boolean }) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new AppError(404, 'Admin not found', 'ADMIN_NOT_FOUND');
  }
  
  if (admin.role === 'SUPER_ADMIN') {
    throw new AppError(403, 'Cannot block superadmin', 'AUTH_FORBIDDEN');
  }

  admin.isActive = payload.isActive;
  await admin.save();
  
  const adminObj = admin.toObject();
  delete (adminObj as any).passwordHash;
  return adminObj;
};

const deleteAdmin = async (id: string) => {
  const admin = await Admin.findById(id);
  if (!admin) {
    throw new AppError(404, 'Admin not found', 'ADMIN_NOT_FOUND');
  }

  if (admin.role === 'SUPER_ADMIN') {
    throw new AppError(403, 'Cannot delete superadmin', 'AUTH_FORBIDDEN');
  }

  await Admin.findByIdAndDelete(id);
  return null;
};

export const AdminManagementService = {
  createAdmin,
  getAllAdmins,
  blockAdmin,
  deleteAdmin,
};

