import { Template } from 'meteor/templating';
import { Router } from 'meteor/iron:router';

Template.controle.events({
  'submit form[name="supprimerMessages"]': function(event) {
    event.preventDefault();
    Meteor.call('conversation.supprimerMessages', 
      Template.instance().data.conversationActuelle.hashId
      ,(err, res) => {
        if (err) {
          alert("Erreur");
        }
      }
    );
    event.stopPropagation();
  }
});

Template.controle.events({
  'submit form[name="supprimerConversation"]': function(event) {
    event.preventDefault();
    Meteor.call('conversation.remove', 
      Template.instance().data.conversationActuelle.hashId
      ,(err, res) => {
        if (err) {
          return alert("Erreur");
        }
        else {
          Router.go('accueil');
        }
      }
    );
    event.stopPropagation();
  }
});

