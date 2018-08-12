(function () {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userData'];
function MyInfoController(userData) {
  var reg = this;
  reg.userData = userData;
  /*reg.userData = { 
  	'firstname' : "Toto", 'lastname' : "TATA", 
  	'email' : "tmartin@live.fr", 'phone': '000-000-0000',
  	'short_name' : "A1"
  };*/
}

})();