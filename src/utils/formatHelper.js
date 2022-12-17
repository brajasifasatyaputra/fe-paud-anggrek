import _ from "lodash";
var CryptoJS = require("crypto-js");

const encryptData = (data) => {
  // Encrypt Text
  // const ciphertext = CryptoJS.AES.encrypt(data, 'secretKey').toString();

  // Encrypt Object / Array
  const ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secretKey"
  ).toString();
  return ciphertext;
};

const decryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, "secretKey");
  const originalText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

  return originalText;
};

const removeDash = (word) => {
  word = _.replace(word, "-", " ");
  return word;
};
export { encryptData, decryptData, removeDash };
