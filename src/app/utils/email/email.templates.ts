const baseEmailTemplate = (title: string, content: string) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #EEF5F3; margin: 0; padding: 30px 0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center">
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #E1ECE9;">
          <!-- Header -->
          <tr>
            <td style="background-color: #041C26; padding: 35px 30px; text-align: center; border-bottom: 4px solid #02E0DF;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 26px; letter-spacing: 1.5px; font-weight: 800; text-transform: uppercase;">
                DIGITAL SOFT ZONE
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 35px; color: #3D5359; font-size: 16px; line-height: 1.6;">
              ${content}
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #041C26; padding: 25px; text-align: center; font-size: 13px; color: rgba(255,255,255,0.68);">
              &copy; ${new Date().getFullYear()} Digital Soft Zone. All rights reserved.<br>
              <span style="color: rgba(255,255,255,0.45);">Software Technology Park, Chittagong, Bangladesh</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const contactEmailTemplate = (data: { name: string; email: string; phone: string; need: string; message: string }) => {
  const content = `
    <h2 style="color: #041C26; margin-top: 0; font-size: 22px; border-bottom: 1px solid #E1ECE9; padding-bottom: 15px;">New Website Inquiry</h2>
    <p>You have received a new inquiry from the DSZ website contact form.</p>
    
    <table width="100%" border="0" cellspacing="0" cellpadding="12" style="background-color: #EEF5F3; border-radius: 6px; margin: 30px 0;">
      <tr>
        <td width="30%" style="font-weight: 600; color: #041C26; border-bottom: 1px solid #E1ECE9;">Name:</td>
        <td width="70%" style="border-bottom: 1px solid #E1ECE9; color: #041C26;">${data.name}</td>
      </tr>
      <tr>
        <td style="font-weight: 600; color: #041C26; border-bottom: 1px solid #E1ECE9;">Email:</td>
        <td style="border-bottom: 1px solid #E1ECE9;">
          <a href="mailto:${data.email}" style="color: #03716B; text-decoration: none; font-weight: 500;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="font-weight: 600; color: #041C26; border-bottom: 1px solid #E1ECE9;">Phone:</td>
        <td style="border-bottom: 1px solid #E1ECE9; color: #041C26;">${data.phone}</td>
      </tr>
      <tr>
        <td style="font-weight: 600; color: #041C26;">Interested In:</td>
        <td><span style="background-color: #041C26; color: #02E0DF; padding: 5px 12px; border-radius: 20px; font-size: 14px; font-weight: 500;">${data.need}</span></td>
      </tr>
    </table>
    
    <h3 style="color: #041C26; margin-top: 35px; font-size: 18px;">Message Details:</h3>
    <div style="background-color: #FFFFFF; border-left: 4px solid #02E0DF; padding: 20px; margin-top: 15px; border-radius: 0 4px 4px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.03);">
      <p style="margin: 0; white-space: pre-wrap; font-style: italic; color: #041C26;">${data.message.replace(/\n/g, '<br>')}</p>
    </div>
    
    <p style="margin-top: 40px; font-size: 15px; color: #03716B; background-color: rgba(3, 113, 107, 0.05); padding: 15px; border-radius: 4px;">
      <strong>Action Required:</strong> Please reply to the prospect as soon as possible to ensure a high conversion rate.
    </p>
  `;
  return baseEmailTemplate('New Contact Inquiry | DSZ', content);
};

export const adminCredentialsTemplate = (data: { name: string; email: string; password: string; loginUrl: string }) => {
  const content = `
    <h2 style="color: #041C26; margin-top: 0; font-size: 22px;">Welcome to the Team, ${data.name}!</h2>
    <p>Your administrative account for the <strong>Digital Soft Zone</strong> dashboard has been successfully created.</p>
    
    <div style="background-color: #EEF5F3; border-radius: 6px; padding: 30px; margin: 35px 0; border: 1px solid #E1ECE9;">
      <h3 style="margin-top: 0; color: #041C26; font-size: 18px; border-bottom: 1px solid rgba(4, 28, 38, 0.1); padding-bottom: 12px;">Your Login Credentials</h3>
      
      <p style="margin-bottom: 8px;"><strong>Login Portal:</strong></p>
      <a href="${data.loginUrl}" style="display: inline-block; background-color: #041C26; color: #02E0DF; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-weight: 600; margin-bottom: 25px; text-align: center; font-size: 15px;">Access Dashboard</a>
      
      <p style="margin-bottom: 10px;"><strong>Email Address:</strong> <br><span style="color: #03716B; font-weight: 500; font-size: 16px;">${data.email}</span></p>
      
      <p style="margin-bottom: 8px; margin-top: 20px;"><strong>Temporary Password:</strong></p>
      <div style="background-color: #FFFFFF; padding: 12px 20px; border-radius: 4px; font-family: monospace; font-size: 18px; letter-spacing: 2px; font-weight: bold; color: #041C26; display: inline-block; border: 1px dashed #03716B;">
        ${data.password}
      </div>
    </div>
    
    <p style="background-color: rgba(255, 77, 77, 0.05); border-left: 3px solid #ff4d4d; padding: 15px 20px; font-size: 15px; margin-top: 35px; color: #b30000; border-radius: 0 4px 4px 0;">
      <strong>Security Notice:</strong> Please log in using the temporary password and change it immediately from your account settings. Do not share these credentials with anyone.
    </p>
    
    <p style="margin-top: 35px; color: #041C26;">Best regards,<br><strong>DSZ Admin System</strong></p>
  `;
  return baseEmailTemplate('Your DSZ Admin Account Details', content);
};

export const resetPasswordOTPTemplate = (data: { name: string; otp: string }) => {
  const content = `
    <h2 style="color: #041C26; margin-top: 0; font-size: 22px;">Hello ${data.name},</h2>
    <p>We received a request to reset your password for your <strong>Digital Soft Zone</strong> admin account.</p>
    
    <div style="background-color: #EEF5F3; border-radius: 6px; padding: 30px; margin: 35px 0; border: 1px solid #E1ECE9; text-align: center;">
      <p style="margin-bottom: 15px; color: #041C26; font-size: 16px;">Your password reset verification code is:</p>
      
      <div style="background-color: #FFFFFF; padding: 15px 30px; border-radius: 4px; font-family: monospace; font-size: 28px; letter-spacing: 8px; font-weight: bold; color: #041C26; display: inline-block; border: 2px dashed #02E0DF;">
        ${data.otp}
      </div>
      
      <p style="margin-top: 20px; font-size: 14px; color: #3D5359;">This code will expire in <strong>10 minutes</strong>.</p>
    </div>
    
    <p style="background-color: rgba(255, 77, 77, 0.05); border-left: 3px solid #ff4d4d; padding: 15px 20px; font-size: 14px; margin-top: 25px; color: #b30000; border-radius: 0 4px 4px 0;">
      If you did not request a password reset, please ignore this email or contact support if you have concerns.
    </p>
    
    <p style="margin-top: 35px; color: #041C26;">Best regards,<br><strong>DSZ Security System</strong></p>
  `;
  return baseEmailTemplate('Password Reset Verification Code', content);
};