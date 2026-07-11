const nodemailer = require("nodemailer");

exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    let data;
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return { statusCode: 400, body: JSON.stringify({ success: false, error: "Invalid request body." }) };
    }

    const contact = (data.contact || "").trim();
    const subject = (data.subject || "").trim();
    const message = (data.message || "").trim();

    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
    const isPhone = /^[+\d][\d\s\-()]{6,}$/.test(contact);
    if (!contact || (!isEmail && !isPhone) || !subject || subject.length < 2 || !message || message.length < 10) {
        return { statusCode: 400, body: JSON.stringify({ success: false, error: "Invalid contact, subject, or message." }) };
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_MAIL_SENDER,
            pass: process.env.NODE_MAILER_GOOGLE_PASS, 
        }
    });

    const mailOptions = {
        from: process.env.GOOGLE_MAIL_SENDER,
        to: process.env.GOOGLE_MAIL_RECIEVER,
        subject: subject,
        text: `${message}\n\nContact Info: ${contact}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: "Email sent successfully!" })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};