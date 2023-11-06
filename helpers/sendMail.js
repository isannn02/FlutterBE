const nodemailer = require('nodemailer');


const sendMail = async (email, mailSubject, content) => {
    try {
       const transport= nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: "fitnesbatam1@gmail.com",
                pass: "wawb dzvp fgjl mhve"
            }

        })

        const mailOptions = {
            from: "gerryajie@gmail.com",
            to: email,
            subject: mailSubject,
            html: content
        }
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error)
            } else {
                console.log('Email Telah berhasil di kirim:-', info.response)
            }
        })

    } catch (error) {
        console.log(error)
    }

}

module.exports = sendMail;