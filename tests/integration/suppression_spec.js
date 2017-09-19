var frisby = require('frisby');

describe("Suppression de conversation", function() {
  it("Suppression de conversation", function(done) {
    frisby.post('http://localhost:3000/api/conversation', {
      nom: "suppression",
      chiffree: false
    })
    .then(function (res) {
      let hashId = res._body.hashId;
      return frisby.post('http://localhost:3000/api/conversation/'+hashId+'/supprimer')
      .then(function (res) {
        return frisby.get('http://localhost:3000/api/conversation/'+hashId)
        .expect('status', 404)
      })
    })
    .done(done);
  })
});
