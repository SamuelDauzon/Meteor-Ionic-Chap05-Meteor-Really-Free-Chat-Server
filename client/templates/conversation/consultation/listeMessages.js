import { Template } from 'meteor/templating';

import { dechiffreMessage } from '../../../lib/chiffrement.js';

Template.messageDiscussion.helpers({
  auteurActuel: function() {
    return Session.get("nomAuteur");
  }
});

Template.messageDetail.helpers({
  dechiffre: function(message) {
    return dechiffreMessage(message, Session.get("motDePasse"));
  }
});