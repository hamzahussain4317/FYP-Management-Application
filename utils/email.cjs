const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
});

async function sendPasswordEmail({ email, password, role }) {
  const subject = `${
    role.charAt(0).toUpperCase() + role.slice(1)
  } Account Credentials`;

  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Hello,</h2>
      <p>Your <strong>${role}</strong> account has been registered.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please log in and change your password immediately.</p>
      <br />
      <p>Regards,<br />FYP Management Team</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"FYP Admin" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject,
    html,
  });
}

module.exports = { sendPasswordEmail };
