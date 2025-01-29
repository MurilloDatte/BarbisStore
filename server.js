const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware to parse JSON data from the client
app.use(bodyParser.json());

// Create a route to send the email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'   // Replace with your email password (use environment variables for production)
        }
    });

    // Email options
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'murillobarbi2010@gmail.com', // The supplier's email address
        subject: 'Product Inquiry or Order Information',
        text: `Message from: ${name} (${email})\n\n${message}` // Message body
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error: ' + error.message);
        }
        res.status(200).send('Email sent successfully!');
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
