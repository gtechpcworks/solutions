const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (images, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// POST endpoint to handle form submissions and send email
app.post('/send-booking', async (req, res) => {
  try {
    const { name, service, date, time, contact } = req.body; // Get form data from the frontend

    // Set up your EmailJS service (replace these with your actual EmailJS credentials)
    const emailData = {
      service_id: 'service_nifebxh',    // Your EmailJS service ID
      template_id: 'template_aw54vjh',  // Your EmailJS template ID
      user_id: 'S_KaBpRaaHRPmUnFw',          // Your EmailJS user ID
      template_params: {
        name: name,
        service: service,
        date: date,
        time: time,
        contact: contact
      }
    };

    // Send the email using EmailJS
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);

    if (response.status === 200) {
      // If email is sent successfully, return a success response
      res.status(200).json({ message: 'Booking submitted successfully!' });
    } else {
      res.status(500).json({ message: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending booking' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000; // Use port 5000 or any port available
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
