import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';


function notifier(message) {
  if (Notification.permission !== 'denied' || Notification.permission === "default") {
    Notification.requestPermission(function (permission) {
      if(!('permission' in Notification)) {
        Notification.permission = permission;
      }
    });
    if (Notification.permission === "granted") {
      new Notification(message);
    }
  }
  if (Notification.permission === "granted") {
    new Notification(message);
  }
}

Template.consultationconversation.helpers({
  newMessage: function() {
		if (Template.parentData(0).conversationActuelle !== undefined) {
			var messageNb = Session.get("messageNb");
			if (messageNb && messageNb < Template.parentData(0).conversationActuelle.messages.length) {
				Session.set("messageNb", Template.parentData(0).conversationActuelle.messages.length);
				if (Session.get("nomAuteur") != Template.parentData(0).conversationActuelle.messages.slice(-1)[0]) {
					notifier("Nouveau message sur "+Template.parentData(0).conversationActuelle.nom);	
				}
			}
			if (!messageNb) {
				Session.set("messageNb", Template.parentData(0).conversationActuelle.messages.length);
			}
		}
    return "Nouveau message";
  }
});