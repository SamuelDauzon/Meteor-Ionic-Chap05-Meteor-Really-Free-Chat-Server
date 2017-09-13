import { Template } from 'meteor/templating';

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