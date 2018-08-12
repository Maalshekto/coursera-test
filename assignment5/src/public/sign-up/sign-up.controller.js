(function () {

angular.module('public')
.controller('SignUpController', SignUpController)

SignUpController.$inject = ['UserService', '$scope']
function SignUpController(UserService, $scope) {
  var reg = this;
  reg.user = [];
  reg.user.short_name = "";

  $scope.short_name = function() {
      return reg.user.short_name;
  }

  reg.submit = function () {
  		UserService.setUserData(reg.user);
    	reg.completed = true;
  };
  
  $scope.$watch($scope.short_name, function(newValue, oldValue){

    if(newValue != oldValue){
      if (reg.user.short_name == "") {
        reg.badDish = false;
        reg.user.favoriteItem = [];
        return;
      }

      var promise = UserService.getFavoriteItem(newValue);
      promise.then(function(response) {
        reg.badDish = false;
        reg.user.favoriteItem = response;
      })
      .catch(function (error) {
        reg.badDish = true;
      });
    }
  });

}



})();