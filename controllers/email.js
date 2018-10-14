
const sgMail = require('@sendgrid/mail');

const sendEmail = (cb) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'vineetm616@gmail.com',
    from: 'order@shopping.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
  cb("Email sent");
}

module.exports = sendEmail;
