const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

const WORKING_KEY = "474061969193407745E1EEE1F6B67EB9"	 || "your-working-key";
const ACCESS_CODE = "AVHM73EI06BA99MHAB"|| "your-access-code";

app.use(bodyParser.json());

function encrypt(text, key) {
    const m = crypto.createHash('md5').update(key).digest();
    const cipher = crypto.createCipheriv('aes-128-cbc', m, m.slice(0, 16));
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

app.post('/encrypt', (req, res) => {
    const data = req.body;
    const inputString = Object.entries(data).map(([k, v]) => `${k}=${v}`).join('&');
    const encRequest = encrypt(inputString, WORKING_KEY);
    res.json({
        encRequest: encRequest,
        accessCode: ACCESS_CODE
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
