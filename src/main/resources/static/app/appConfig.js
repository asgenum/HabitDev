angular.module('MainApp').config(['$stateProvider', '$mdThemingProvider', 'ChartJsProvider',
    function ($stateProvider, $mdThemingProvider, ChartJsProvider) {

        $stateProvider.state('home', {
            url: '/home',
            templateUrl: 'app/views/home.html',
            controller: 'HomeController'
        }).state('loading', {
            url: '',
            templateUrl: 'app/views/loading.html',
            controller: 'LoadingController'
        }).state('login', {
            url: '/login',
            templateUrl: 'app/views/login.html',
            controller: 'LoginController'
        }).state('register', {
            url: '/register',
            templateUrl: 'app/views/register.html',
            controller: 'RegisterController'
        }).state('dashboard', {
            url: '/dashboard',
            templateUrl: 'app/views/dashboard.html',
            controller: 'DashboardController'
        }).state('dashboard.home', {
            url: '/home',
            templateUrl: 'app/views/view1.html',
            controller: 'View1Ctrl'
        }).state('dashboard.tasks', {
            url: '/tasks',
            templateUrl: 'app/views/tasks.html',
            controller: 'TasksController'
        }).state('dashboard.current-plans', {
            url: '/currentplans',
            templateUrl: 'app/views/current-plans.html',
            controller: 'CurrentPlansController'
        }).state('dashboard.my-plans', {
            url: '/myplans',
            templateUrl: 'app/views/my-plans.html',
            controller: 'MyPlansController'
        }).state('dashboard.users-plans', {
            url: '/usersplans',
            templateUrl: 'app/views/users-plans.html',
            controller: 'UsersPlansController'
        }).state('dashboard.users-statistic', {
            url: '/usersstatistic',
            templateUrl: 'app/views/users-statistic.html',
            controller: 'UsersStatisticController'
        });

        ChartJsProvider.setOptions({
            responsive: true
        });


        $mdThemingProvider.alwaysWatchTheme(true);
        $mdThemingProvider.generateThemesOnDemand(true);
        $mdThemingProvider.definePalette('amazingPaletteName', {
            '50': 'ffebee',
            '100': 'ffcdd2',
            '200': 'ef9a9a',
            '300': 'e57373',
            '400': 'ef5350',
            '500': 'f44336',
            '600': 'e53935',
            '700': 'd32f2f',
            '800': 'c62828',
            '900': 'b71c1c',
            'A100': 'ff8a80',
            'A200': 'ff5252',
            'A400': 'ff1744',
            'A700': 'd50000',
            'contrastDefaultColor': 'light',

            'contrastDarkColors': ['50', '100',
                '200', '300', '400', 'A100'],
            'contrastLightColors': undefined
        });

        $mdThemingProvider.theme('primary')
            .primaryPalette('amazingPaletteName')
            .accentPalette('yellow');
        $mdThemingProvider.setDefaultTheme('primary');

        $mdThemingProvider.theme('altTheme')
            .primaryPalette('blue')

            .accentPalette('purple', {
                'default': '200'
            }).dark();
        $mdThemingProvider.theme('altTheme2')
            .primaryPalette('blue')

            .accentPalette('purple', {
                'default': '200'
            });

        $mdThemingProvider.generateThemesOnDemand(true);
    }]);