import moment from 'moment';

Template.registerHelper('equals', function (a, b) {
	console.log('a');
	console.log(a);
	console.log('b');
	console.log(b);
  return a === b;
});
Template.registerHelper("formatDateTime", function(date) {
  return moment(date).format('DD/MM/YYYY HH:mm:ss');
});