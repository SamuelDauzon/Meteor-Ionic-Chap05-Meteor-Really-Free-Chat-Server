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