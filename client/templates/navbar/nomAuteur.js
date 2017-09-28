import { Template } from 'meteor/templating';


Template.nomAuteur.events({
   'change #nomAuteur': function(event) {
    event.preventDefault();
    Session.set("nomAuteur", event.target.value);
    event.stopPropagation();
    return false;
  },
  'submit form[name="form-auteur"]': function(event) {
    event.preventDefault();
    Session.set("nomAuteur", event.target.nomAuteur.value);
    event.stopPropagation();
    return false;
  }
});

Template.nomAuteur.helpers({
  'pseudoDefini': function() {
    return !!Session.get("nomAuteur");
  }
});