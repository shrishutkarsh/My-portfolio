const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "unloop44@gmail.com",   // change this
        pass: "Unloop@44"      // use Gmail App Password, not your login password
      }
    });

    await transporter.sendMail({
      from: email,
      to: "unloop44@gmail.com",       // the inbox where you want to receive
      subject: subject,
      text: `From: ${name} <${email}>\n\n${message}`
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
