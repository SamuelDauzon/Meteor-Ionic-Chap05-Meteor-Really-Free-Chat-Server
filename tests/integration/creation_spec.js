var frisby = require('frisby');

describe("Création de conversation", function() {
  it("Création d'une nouvelle conversation", function(done) {
    frisby.post('http://localhost:3000/api/conversation', {
      nom: "bar",
      chiffree: false
    })
    .expect('status', 200)
    .expect('jsonTypes', 'data', {
      hashId: frisby.Joi.string()
     })
    .done(done);
  })
});