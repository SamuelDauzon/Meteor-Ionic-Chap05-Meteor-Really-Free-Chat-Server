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
    var _id = ConversationsCollection.insert(document);
    return ConversationsCollection.findOne({_id:_id}).hashId;
  }
});

Meteor.methods({
  'conversation.envoiMessage': function (hashId, messageObj) {
    check(hashId, String);
    check(messageObj, {
      auteur: Match.Where((auteur) => {
        check(auteur, String);
        return auteur.length || auteur.length <= 30;
      }),
      message: Match.Where((message) => {
        check(message, String);
        return message.length;
      })
    });
    messageObj.dateMessage = new Date();
    return ConversationsCollection.update(
      {hashId : hashId},
      {
        $push: {
          messages: {
            $each: [messageObj],
            $position: 0
          }
        }
      }
    );
  }
});

Meteor.methods({
  'conversation.supprimerMessages': function (hashId) {
    check(hashId, String);
    return ConversationsCollection.update(
      {hashId : hashId},
      {
        $set: {
          messages: []
        }
      }
    );
  }
});

Meteor.methods({
  'conversation.remove': function (hashId) {
    check(hashId, String);
    return ConversationsCollection.remove({hashId: hashId});
  }
});
