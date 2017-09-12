var CryptoJS = require("crypto-js");

export function chiffreMessage(message, motDePasse) {
  var messageChiffre = message;
  if (motDePasse) {
    var ciphertext = CryptoJS.AES.encrypt(message, motDePasse);
    messageChiffre = ciphertext.toString();
  }
  return messageChiffre;
}

export function dechiffreMessage(message, motDePasse) {
  var messageClair = message;
  if (motDePasse) {
    var bytes  = CryptoJS.AES.decrypt(message, motDePasse);
    messageClair = bytes.toString(CryptoJS.enc.Utf8);
  }
  return messageClair;
}