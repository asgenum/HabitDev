
angular.module('MainApp', [ 'ui.router', 'MainApp.view1', 'ngMaterial', 'kendo.directives', 'chart.js'])

.run(function(UserStorageService, $rootScope, $state, $timeout) {
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

		console.log(UserStorageService.user);
		if (!UserStorageService.user) {

			if (toState.name != 'login' && toState.name != 'register'
				&& toState.name != 'home' && toState.name != 'loading') {
				event.preventDefault();
				$state.go('login');
			}
		} else {
			if (toState.data && toState.data.role) {
				var hasAccess = false;
				for (var i = 0; i < UserStorageService.user.roles.length; i++) {
					var role = UserStorageService.user.roles[i].name;
					if (toState.data.role == role) {
						hasAccess = true;
						break;
					}
				}
				if (!hasAccess) {
					event.preventDefault();
					$state.go('access-denied');
				}

			}
		}
	});
});