export const contactEmailTemplate = (data: { name: string; contact: string; need: string; message: string }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Contact Inquiry from DSZ Website</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Contact:</strong> ${data.contact}</p>
      <p><strong>Need:</strong> ${data.need}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="border-left: 4px solid #ccc; padding-left: 10px; margin-left: 0;">
        ${data.message.replace(/\n/g, '<br>')}
      </blockquote>
    </div>
  `;
};