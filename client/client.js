import moment from 'moment';

Template.registerHelper('equals', function (a, b) {
  return a === b;
});
Template.registerHelper("formatDateTime", function(date) {
  return moment(date).format('DD/MM/YYYY HH:mm:ss');
});