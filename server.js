const express = require('express');
const bodyParser = require('body-parser');


const crypto = require('crypto');

const iv = Buffer.from([...Array(16).keys()]); // 0x00 to 0x0f

exports.encrypt = function (plainText, workingKey) {
    const key = crypto.createHash('md5').update(workingKey).digest();
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

exports.decrypt = function (encText, workingKey) {
    const key = crypto.createHash('md5').update(workingKey).digest();
    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    let decrypted = decipher.update(encText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
