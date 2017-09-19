import { Router } from 'meteor/iron:router';

Router.route('api/conversation', function () {
  var request = this.request;
  this.response.setHeader('Content-Type', 'application/json');
  var chiffree = false;
  if (request.body.chiffree === "true") {
    chiffree = true;
  }
  var result = Meteor.call('conversation.insert',
    {nom: request.body.nom, chiffree: chiffree}
  );
  this.response.end(JSON.stringify({hashId:result}));
}, {where: 'server'});

Router.route('api/conversation/:hashId', function () {
  this.response.setHeader('Content-Type', 'application/json');
  var conversation = ConversationsCollection.findOne({
    hashId: this.params.hashId
  });
  if (conversation) {
    this.response.end(JSON.stringify(conversation));
  }
  else {
    this.response.writeHead(404);
    this.response.end(JSON.stringify({error:"La conversatio n'existe pas."}));
  }
}, {where: 'server'});

Router.route('api/conversation/:hashId/ajoutMessage', function () {
  var request = this.request;
  this.response.setHeader('Content-Type', 'application/json');
  var result = Meteor.call('conversation.envoiMessage',
    this.params.hashId,
    {
      auteur: request.body.auteur,
      message: request.body.message
    }
  );
  this.response.end(JSON.stringify({result:result}));
}, {where: 'server'});

Router.route('api/conversation/:hashId/supprimerMessages', function () {
  this.response.setHeader('Content-Type', 'application/json');
  var result = Meteor.call('conversation.supprimerMessages',
    this.params.hashId
  );
  this.response.end(JSON.stringify({result:'true'}));
}, {where: 'server'});

Router.route('api/conversation/:hashId/supprimer', function () {
  this.response.setHeader('Content-Type', 'application/json');
  var result = Meteor.call('conversation.remove',
    this.params.hashId
  );
  this.response.end(JSON.stringify({result:'true'}));
}, {where: 'server'});
