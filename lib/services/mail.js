'use strict';
require('dotenv').config(); 
const { Service } = require('@hapipal/schmervice'); 
const nodemailer = require("nodemailer");

class MailService extends Service {
    constructor() {
        super(); // Appel du constructeur de la classe parente
       
            this.transporter = nodemailer.createTransport({
                host: process.env.MAIL_HOST,
                port: process.env.MAIL_PORT,
                secure: process.env.MAIL_SECURE === 'true',
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
            }
        });
    }
    async warnFavorite(emailList) {

        try {
             // Prepare the email message
        const mailOptions = {
            from: 'Your Name <your.email@example.com>',
            to: emailList,
            subject: 'Warning: Movie Update',
            text: 'Dear user,\n\nThis is to inform you that the movie you have favorited has been updated.\n\nSincerely,\nThe Movie App Team'
        };

        // Send the email
        const info = await this.transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    
    }


    async sendWelcomeEmail(userEmail) {
        try {
            const info = await this.transporter.sendMail({
                from: 'Votre Nom" <'+userEmail+'>',
                to: userEmail,
                subject: 'Bienvenue sur notre plateforme',
                text: 'Bienvenue sur notre plateforme ! Nous sommes ravis de vous accueillir.'
            });
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }
    async sendNewFilmNotification(users, createdFilm) {
        const userEmails = users.map(user => user.mail);
        for (const userEmail of userEmails) {
            try {
                const info = await this.transporter.sendMail({
                    from: 'Votre Nom" <' + userEmail + '>',
                    to: userEmail,
                    subject: 'Nouveau Film',
                    text: 'Nouveau Film :' + createdFilm.title // Assuming createdFilm is an object with a title property
                });
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
    }
    

}
module.exports = MailService;



