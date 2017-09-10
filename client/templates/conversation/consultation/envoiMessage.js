import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.envoiMessageConversation.events({
  'submit form[name="form-creation-conversation"]': function(event) {
    event.preventDefault();
    var message = event.target.message.value;
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
    event.target.message.value = "";
    event.stopPropagation();
  }
});