Template.motDePasse.events({
  'submit form[name="entrerMdp"]': function(event) {
    event.preventDefault();
    var motDePasse = event.target.mot_de_passe.value;
    if (motDePasse) {
      Session.set("motDePasse", motDePasse);
    }
    event.target.mot_de_passe.value = "";
    event.stopPropagation();
  }
});

Template.motDePasse.helpers({
  mdpActif: function() {
    return !!Session.get("motDePasse");
  }
});