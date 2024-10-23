const nodemailer = require("nodemailer");

const EMAIL = "ranveerwalia76@gmail.com";
const Pass = "pfsj kssx cpxh rwwq ";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: Pass,
  },
});

async function sendMail(receiverEmail, subject, body) {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: receiverEmail,
      subject: subject,
      html: body,
    });

    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", EMAIL);
  }
}

exports.sendMail = sendMail;
