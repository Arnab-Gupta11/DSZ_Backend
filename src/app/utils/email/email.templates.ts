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

export const adminCredentialsTemplate = (data: { name: string; email: string; password: string; loginUrl: string }) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #0f172a;">Welcome to DSZ Admin Panel</h2>
      <p>Hello ${data.name},</p>
      <p>An admin account has been created for you at Digital Soft Zone.</p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; border-radius: 6px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0;"><strong>Login URL:</strong> <a href="${data.loginUrl}">${data.loginUrl}</a></p>
        <p style="margin: 0 0 10px 0;"><strong>Email:</strong> ${data.email}</p>
        <p style="margin: 0;"><strong>Temporary Password:</strong> <span style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${data.password}</span></p>
      </div>
      <p>Please log in and change your password immediately.</p>
      <p>Best regards,<br>DSZ Team</p>
    </div>
  `;
};