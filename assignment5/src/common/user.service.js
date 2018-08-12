(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;

  var userData = [];

  service.getUserData = function () {
    return userData;
  };


  service.setUserData = function (ud) {
    userData = ud;
  };

  service.getFavoriteItem = function(sn) {
  	return $http.get(ApiPath + '/menu_items/' + sn + '.json').then(function (response) {
      return response.data;
    });
  }

}



})();
