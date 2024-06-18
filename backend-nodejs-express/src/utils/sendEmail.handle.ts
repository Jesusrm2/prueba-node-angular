import transporter from "../config/mailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
    let mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text,
    };
  
    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) reject(error);
        resolve(info);
      });
    });
  };