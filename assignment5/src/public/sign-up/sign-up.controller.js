(function () {

angular.module('public')
.controller('SignUpController', SignUpController)

SignUpController.$inject = ['UserService']
function SignUpController(UserService) {
  var reg = this;

  reg.submit = function () {
   
  	if (reg.user.short_name == "" || !reg.user.short_name) {
  		UserService.setUserData(reg.user);
    	reg.completed = true;
  	} 
  	else {
    	var promise = UserService.getFavoriteItem(reg.user.short_name);
    	promise.then(function(response) {
    		reg.user.favoriteItem = response;
    		console.log(response);
    		UserService.setUserData(reg.user);
    		reg.completed = true;
        reg.badDish = false;
    	})
    	.catch(function (error) {
    		reg.badDish = true;
    	});		
    }
  	};
}

})();