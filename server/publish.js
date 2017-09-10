Meteor.publish('conversation', function(hashId) {
  return ConversationsCollection.find({
    hashId: hashId
  });
});