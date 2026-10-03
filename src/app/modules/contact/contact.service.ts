import { Contact } from './contact.model.js';
import { sendContactEmail } from '../../utils/email/email.service.js';
import { AppError } from '../../errors/AppError.js';
export const ContactService = {
  createContact: async (payload: any) => {
    const contact = await Contact.create(payload);
    await sendContactEmail(payload);
    return contact;
  },
  getAllContacts: async () => await Contact.find().sort('-createdAt'),
  updateStatus: async (id: string, status: string) => {
    const c = await Contact.findByIdAndUpdate(id, { status }, { new: true });
    if (!c) throw new AppError(404, 'Contact not found', 'CONTACT_NOT_FOUND');
    return c;
  }
};