let sgMail = require('@sendgrid/mail')
    pug = require('pug')
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

module.exports = {
    HelloWorldMail : async () => {
        const
            compaleMail = pug.compileFile('./templates/email/createAccount.pug'),
            html = compaleMail({ name : 'Ashwin'}),
            msg = {
                to : 'ashwin.n@cgvakindia.com',
                from : process.env.EMAIL_FROM,
                subject : 'Hello World !',
                message : 'Simple ',
                html
            }
        sgMail.send(msg)
            .then(() => {
                return Promise.resolve(true)
            })
            .catch(() => {
                
            })
    }
}