(function () {

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userData'];
function MyInfoController(userData) {
  var reg = this;
  reg.userData = userData;
}

})();