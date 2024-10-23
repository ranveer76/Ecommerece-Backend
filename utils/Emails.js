const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

async function sendMail(receiverEmail, subject, body) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: subject,
      html: body,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", process.env.EMAIL);
  }
}

exports.sendMail = sendMail;
