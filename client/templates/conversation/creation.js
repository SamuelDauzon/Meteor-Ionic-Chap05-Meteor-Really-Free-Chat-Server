import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.creationconversation.events({
  'submit form[name="form-creation-conversation"]': function(event) {
    event.preventDefault();
    nom = event.target.nom.value;
    mdp = event.target.mdp.value;
    chiffree = !!mdp;
    Meteor.call('conversation.insert',
      {nom: nom, chiffree: chiffree},
      function(error, result) {
        if (error) {
          return alert('Erreur : '+error.error);
        }
      }
    );
    event.target.nom.value = "";
    event.target.mdp.value = "";
    event.stopPropagation();
  }
});