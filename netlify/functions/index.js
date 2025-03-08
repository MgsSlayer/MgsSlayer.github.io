const nodemailer = require("nodemailer");

exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const data = JSON.parse(event.body);

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "michael.oboho@gmail.com",
            pass: process.env.NODE_MAILER_GOOGLE_PASS, // Ensure this is set in Netlify
        }
    });

    let mailOptions = {
        from: "michael.oboho@gmail.com",
        to: "esio.oboho@gmail.com",
        subject: data.subject,
        text: data.message
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
