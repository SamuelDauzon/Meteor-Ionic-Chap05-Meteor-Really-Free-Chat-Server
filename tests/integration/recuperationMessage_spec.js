var frisby = require('frisby');

describe("Récupération de conversation", function() {
  it("Création d'une nouvelle conversation", function(done) {
    frisby.post('http://localhost:3000/api/conversation', {
      nom: "recup",
      chiffree: false
    })
    .then(function (res) {
      let hashId = res._body.hashId;
      return frisby.get('http://localhost:3000/api/conversation/'+hashId)
        .expect('status', 200)
        .expect('jsonTypes', 'data', {
          hashId: frisby.Joi.string(),
          nom: frisby.Joi.string()
        })
        .then(function (json) {
          expect(json._body.nom).toBe('recup');
        })
      })
    .done(done);
  })
});