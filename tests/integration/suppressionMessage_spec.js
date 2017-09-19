var frisby = require('frisby');

describe("Modification de conversation", function() {
  it("Suppression des messages", function(done) {
    frisby.post('http://localhost:3000/api/conversation', {
      nom: "suppressionMessage",
      chiffree: false
    })
    .then(function (res) {
      let hashId = res._body.hashId;
      return frisby.post('http://localhost:3000/api/conversation/'+hashId+'/ajoutMessage', 
        {
          auteur: "Samuel",
          message: "Mon message"
        }
      )
      .then(function (res) {
        return frisby.post('http://localhost:3000/api/conversation/'+hashId+'/supprimerMessages')
        .then(function (res) {
          return frisby.get('http://localhost:3000/api/conversation/'+hashId)
          .expect('status', 200)
          .expect('jsonTypes', 'data', {
            hashId: frisby.Joi.string(),
            nom: frisby.Joi.string()
          })
          .then(function (json) {
            expect(json._body.messages.length).toBe(0);
          })
        })
      });
    })
    .done(done);
  })
});
