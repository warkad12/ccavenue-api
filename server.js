const express = require("express");
const crypto = require("crypto");
const app = express();
app.use(express.json());

const workingKey = "5359E7A74922E31E22D5EF4DC0545518"; // Replace with your CCAvenue working key

app.post("/encrypt", (req, res) => {
  const plainText = req.body.data;
  const cipher = crypto.createCipheriv("aes-128-ecb", workingKey, null);
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(plainText, "utf8", "hex");
  encrypted += cipher.final("hex");
  res.json({ enc_request: encrypted });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
