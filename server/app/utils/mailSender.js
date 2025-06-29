import nodemailer from 'nodemailer';

const mailSender = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
      tls: {
        // ✅ This line tells Node to accept self-signed certs (needed on some cloud platforms like Render)
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      html: html,
    });

    console.log('email sent successfully');
    return true;
  } catch (error) {
    console.log('email not sent');
    console.log(error);
  }
};

export default mailSender;

// import nodemailer from 'nodemailer'

// const mailSender = async(email, subject, html)=>{
//     try{
//         const transporter = nodemailer.createTransport({
//             host: process.env.HOST,
//             service: process.env.SERVICE,
//             port: Number(process.env.EMAIL_PORT),
//             secure:Boolean(process.env.SECURE),
//             auth:{
//                 user:process.env.USER,
//                 pass: process.env.PASS
//             }
//         })
//         await transporter.sendMail({
//             from: process.env.USER,
//             to: email,
//             subject:subject,
//             html: html
//         })
//         console.log('email sent successfully')
//         return true
//     }catch(error){
//         console.log("email not sent")
//         console.log(error)
//     }
// }

// export default mailSender
