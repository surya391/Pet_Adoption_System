import nodemailer from 'nodemailer'
import { TOKEN_EMAIL_TEMPLATE } from './mailTemplate.js'

const mailSender = async(email, subject, url)=>{
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass: process.env.PASS
            }
        })
        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject:subject,
            html: TOKEN_EMAIL_TEMPLATE.replace("{token}",url)
        })
        console.log('email sent successfully')
        return true
    }catch(error){
        console.log("email not sent")
        console.log(error)
    }
}

export default mailSender