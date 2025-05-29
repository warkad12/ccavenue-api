const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

const PORT = process.env.PORT || 3000;

// Replace with your actual working key and access code
const WORKING_KEY = "474061969193407745E1EEE1F6B67EB9"; 
const ACCESS_CODE = "AVHM73EI06BA99MHAB";

// Static IV like CCAvenue expects
const iv = Buffer.from([...Array(16).keys()]); // [0x00 to 0x0f]

function encrypt(plainText, workingKey) {
    const key = crypto.createHash('md5').update(workingKey).digest();
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

app.use(bodyParser.json());

app.post('/encrypt', (req, res) => {
    try {
        const data = req.body;
        const inputString = Object.entries(data)
            .map(([k, v]) => `${k}=${v}`)
            .join('&');
        const encRequest = encrypt(inputString, WORKING_KEY);
        res.json({ encRequest, accessCode: ACCESS_CODE });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Encryption failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Encryption server running on port ${PORT}`);
});
