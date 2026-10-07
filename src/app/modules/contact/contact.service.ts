import { Contact } from './contact.model.js';
import { sendContactEmail } from '../../utils/email/email.service.js';
import { AppError } from '../../errors/AppError.js';
import { QueryBuilder } from '../../utils/queryBuilder.js';

export const ContactService = {
  createContact: async (payload: any) => {
    const contact = await Contact.create(payload);
    await sendContactEmail(payload);
    return contact;
  },
  getAllContacts: async (query: Record<string, unknown>) => {
    const contactQuery = new QueryBuilder(Contact.find(), query)
      .search(['name', 'contact', 'need', 'message'])
      .filterByCategory(['status'])
      .sort()
      .paginate()
      .fields();

    const result = await contactQuery.modelQuery;
    
    const countQuery = new QueryBuilder(Contact.find(), query)
      .search(['name', 'contact', 'need', 'message'])
      .filterByCategory(['status']);
    const total = await countQuery.modelQuery.countDocuments();

    return { data: result, total };
  },
  getContactById: async (id: string) => {
    const c = await Contact.findById(id);
    if (!c) throw new AppError(404, 'Contact not found', 'CONTACT_NOT_FOUND');
    return c;
  },
  updateStatus: async (id: string, status: string) => {
    const c = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!c) throw new AppError(404, 'Contact not found', 'CONTACT_NOT_FOUND');
    return c;
  },
  deleteContact: async (id: string) => {
    const c = await Contact.findByIdAndDelete(id);
    if (!c) throw new AppError(404, 'Contact not found', 'CONTACT_NOT_FOUND');
    return c;
  }
};