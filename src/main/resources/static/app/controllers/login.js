angular.module('MainApp')

.controller('LoginController', function($http, $scope, $state, UserStorageService, $rootScope) {

	$scope.login = function() {
		$http({
			url : 'authenticate',
			method : "POST",
			params : {
				username : $scope.username,
				password : $scope.password
			}
		}).success($scope.loginSuccess).error($scope.errorFunction);
	};
	$scope.loginSuccess = function(res) {
		$scope.password = null;

		if (res.token) {
			$scope.message = '';

			$http.defaults.headers.common['Authorization'] = 'Bearer ' + res.token;


			UserStorageService.user = res.user;
			$rootScope.$broadcast('LoginSuccessful');

			$state.go('dashboard.home');
		} else {

			$scope.message = 'Вход не был выполнен.';
		}
	}

	$scope.errorFunction = function(error) {
		$scope.message = 'Вход не был выполнен.';
	}
});
