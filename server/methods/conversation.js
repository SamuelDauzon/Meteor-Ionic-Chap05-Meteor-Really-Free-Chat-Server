import { Meteor } from 'meteor/meteor';
jsSHA = require("jssha");

Meteor.methods({
  'conversation.insert': function (document) {
    check(document, {
      nom: Match.Where((nom) => {
        check(nom, String);
        return nom.length || nom.length <= 100;
      }),
      chiffree: Boolean
    });
    document.messages = [];
    baseTexteHash = document.nom+Date.now()+Meteor.settings.private.selHashId;
    jsShaInstance = new jsSHA("SHA3-256", "TEXT");
    jsShaInstance.update(baseTexteHash);
    document.hashId = jsShaInstance.getHash("HEX");
    ConversationsCollection.insert(document);
  }
});