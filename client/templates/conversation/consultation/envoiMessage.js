import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import { chiffreMessage } from '../../../lib/chiffrement.js';

function envoiMessageFormMessage(message) {
  message = chiffreMessage(message, Session.get("motDePasse"));
  var auteur = Session.get("nomAuteur");
  Meteor.call('conversation.envoiMessage', 
    Template.instance().data.conversationActuelle.hashId,
    {
      message: message,
      auteur: auteur
    }, (err, res) => {
      if (err) {
        alert("Données refusées. Avez-vous bien défini votre pseudo en haut à droite ?");
      }
    }
  );
}

Template.envoiMessageConversation.events({
  'submit form[name="formEnvoiMessage"]': function(event) {
    event.preventDefault();
    envoiMessageFormMessage(event.target.message.value);
    event.target.message.value = "";
    event.stopPropagation();
  },
  'keyup form[name="formEnvoiMessage"]': function(event) {
    if (!Session.get("nomAuteur")) {
      alert("Pour envoyer le message, le pseudo doit être défini en haut à droite");
    }
    if (event.which === 13 && !event.ctrlKey && !event.shiftKey) {
      event.preventDefault();
      envoiMessageFormMessage(event.target.value);
      event.target.value = "";  
      event.stopPropagation();
    }
  }
});