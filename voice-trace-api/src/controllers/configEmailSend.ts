import * as nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Service de messagerie : Gmail
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: 'd8935230@gmail.com',
    pass: 'ffvf atlq xqyp agad', //'dounia2001@', 
  },
});


export function generateResetCode(email: string): string {
  const code = Math.random().toString(36).substr(2, 6);
  return code;
}

export function sendResetCodeByEmail(email: string, code: string) {
  const mailOptions = {
    from: {
      name : 'voiceTrace' ,
      address: 'd8935230@gmail.com',
  },
    to: email,
    subject: 'Code de réinitialisation de mot de passe',
    text: `Votre code de réinitialisation de mot de passe est : ${code}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Erreur lors de l\'envoi de l\'e-mail : ' + error);
    } else {
      console.log('E-mail envoyé avec succès : ' + info.response);
    }
  });
}
