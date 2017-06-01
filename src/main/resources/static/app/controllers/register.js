angular.module('MainApp')

.controller('RegisterController', function($http, $scope, $state, $timeout, UserStorageService) {
	$scope.submit = function() {
		$http.post('register', $scope.appUser).success(function(res) {
			console.log($scope.appUser);
			$scope.appUser = null;
			$scope.confirmPassword = null;
			$scope.registerForm.$setPristine();
			$scope.submitMessage = "Регистрация удачно завершена";
			$timeout(function(){
				$state.go('login');
			}, 1000);
		}).error(function(error) {
			$scope.errorMessage = "Пользователь с таким именем уже существует";
		});
	};
});
