const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'titus.kunde@ethereal.email',
    pass: 'Usbqy7canUWQyqZdEx'
  }
})

const send = async (address, { subject, html }) => {
  const message = {
    from: 'Reinaldo Santos',
    to: 'titus.kunde@ethereal.email',
    subject,
    html: html || '<h1>Fala Dev</h1>'
  }
  const info = await transporter.sendMail(message)
  console.log(nodemailer.getTestMessageUrl(info))
}

module.exports = { send }
