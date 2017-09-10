import { Template } from 'meteor/templating';

Template.messageDiscussion.helpers({
  auteurActuel: function() {
    return Session.get("nomAuteur");
  }
});