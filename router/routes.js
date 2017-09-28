import { Router } from 'meteor/iron:router';

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  template: 'accueil',
  name: 'accueil'
});

Router.route('/creation-conversation', {
  template: 'creationconversation',
  name: 'creation-conversation'
});

Router.route('/conversation/:hashId', {
  template: 'consultationconversation',
  name: 'consultationconversation',
  data: function() {
    var conversationActuelle = ConversationsCollection.findOne({
      hashId: this.params.hashId
    });
    return {
      'conversationActuelle': conversationActuelle
    };
  },
  subscriptions: function() {
    return Meteor.subscribe('conversation', this.params.hashId);
  },
  onAfterAction: function() {
    document.title = 'Really Free Chat';
  }
});