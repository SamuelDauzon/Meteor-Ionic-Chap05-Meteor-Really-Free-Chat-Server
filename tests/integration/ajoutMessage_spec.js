var frisby = require('frisby');

describe("Modification de conversation", function() {
  it("Ajout d'un message", function(done) {
    frisby.post('http://localhost:3000/api/conversation', {
      nom: "ajout",
      chiffree: false
    })
    .then(function (res) {
      let hashId = res._body.hashId;
      frisby.post('http://localhost:3000/api/conversation/'+hashId+'/ajoutMessage', 
        {
          auteur: "Samuel",
          message: "Mon message"
        }
      )
      .then(function (res) {
        frisby.get('http://localhost:3000/api/conversation/'+hashId)
        .expect('status', 200)
        .expect('jsonTypes', 'data', {
          hashId: frisby.Joi.string(),
          nom: frisby.Joi.string()
        })
        .then(function (json) {
          expect(json._body.messages[0].message).toBe('Mon message');
        })
      });
    })
    .done(done);
  })
});
