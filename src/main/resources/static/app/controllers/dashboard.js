angular.module('MainApp')
    .controller('DashboardController', DashboardController)
    .filter('titleCase', titleCase).service('Load_document', ['$rootScope', function () {
        var service = {
            Start: Start,
            Stop: Stop
        };
        return service

        function Start($rootScope) {
            $rootScope.Load_Document = true;
        }

        function Stop($rootScope) {
            $rootScope.Load_Document = false;
        }
    }])
    .directive('themePreview', themePreview)
    .directive('scrollToBottom', scrollToBottom)
    .directive("outsideClick", ['$document', '$parse', '$timeout', outsideClick])
    .directive('spyStyle', ['$timeout', spyStyle])
    .controller('LeftCtrl', LeftCtrl)
    .controller('RightCtrl', RightCtrl);

DashboardController.$inject = ['$scope', '$state', '$timeout', '$mdSidenav', '$log', '$mdTheming', '$mdColorPalette', '$mdColors', '$mdColorUtil', '$mdMedia', '$filter', '$anchorScroll', 'Load_document', '$rootScope', 'UserStorageService'];
function DashboardController($scope, $state, $timeout, $mdSidenav, $log, $mdTheming, $mdColorPalette, $mdColors, $mdColorUtil, $mdMedia, $filter, $anchorScroll, Load_document, $rootScope, UserStorageService) {

    $scope.title = 'Домашняя страница';
    $scope.Show_Notification = false;
    $scope.Show_User_Profile = false;
    $scope.goToHome = function(){
        $scope.title = 'Домашняя страница';
        $state.go('dashboard.home');
    };
    $scope.goToTasks = function(){
        $scope.title = 'Задачи на сегодня';
        $state.go('dashboard.tasks');
    };
    $scope.goToCurrentPlans = function(){
        $scope.title = 'Выполняемые планы';
        $state.go('dashboard.current-plans');
    };
    $scope.goToMyPlans = function(){
        $scope.title = 'Мои планы';
        $state.go('dashboard.my-plans');
    };
    $scope.goToUsersPlans = function(){
        $scope.title = 'Пользовательские планы';
        $state.go('dashboard.users-plans');
    };
    $scope.goToUsersStatistic = function(){
        $scope.title = 'Статистика учеников';
        $state.go('dashboard.users-statistic');
    };
    $scope.Show_Notification_Click = function () {
        $scope.Show_Notification = !$scope.Show_Notification;
    };
    $scope.Show_User_Profile_Click = function (ev) {
        $scope.Show_User_Profile = !$scope.Show_User_Profile;
    };
    $scope.Notification_Click = function (val) {
        $timeout(function () {
            $scope.Notifications[val].Seen = true;
        }, 200)
    };
    $scope.logout = function() {
        UserStorageService.user = null;
        $scope.user = null;
        $rootScope.$broadcast('LogoutSuccessful');
        $state.go('login');
    };
    $scope.Notifications = [{Name: "Выполнить задание из \"Java SE\" ", Action: "Task", Seen: false, Icon: "code"},
        {Name: "Выполнить задание из \"Общий курс по математике\"", Action: "Task", Seen: false, Icon: "code"}];

    $scope.user = UserStorageService.user;

    $scope.formatDate = function (date) {
        $scope.today = new Date();
        var diff = $filter('date')($scope.today - date, 'dd');
        if (diff == 1) {
            $scope.PrevDate = "Today"
        }
        else if (diff == 2) {
            $scope.PrevDate = "Yesterday"
        }
        else if (diff > 2 && diff < 5) {
            $scope.PrevDate = $filter('date')(date, 'EEEE');
        }
        else {
            $scope.PrevDate = $filter('date')(date, 'fullDate');
        }
        if ($scope.retDate != $scope.PrevDate) {
            $scope.retDate = $scope.PrevDate;
            return $scope.PrevDate;
        }
        else {
            return null;
        }
    };
    $scope.primary = 'blue';
    $scope.accent = 'green';
    $scope.colors = Object.keys($mdColorPalette);
    $scope.isPinned = false;
    $scope.$watch(function () {
        return $mdMedia('xs');
    }, function (bool) {
        $scope.screen = bool;
        if (bool)
            $scope.isPinned = false;
        else {
            $scope.isPinned = false;
            $scope.myStyle = {width: '100%'};
        }
    });

    $scope.lock = function () {
        $timeout(function () {
            $mdSidenav('left').close()
            $scope.isPinned = !$scope.isPinned;
            $mdSidenav('left').open();
            if ($scope.isPinned)
                $scope.myStyle = {width: '88px'};
            else
                $scope.myStyle = {width: '100%'};
        }, 200);

    }
    $scope.getColor = function (color) {
        return $mdColorUtil.rgbaToHex($mdColors.getThemeColor(color))
    };
    $scope.selectThemePrimary = function (color) {
        $scope.primary = color;
    };
    $scope.selectThemeAccent = function (color) {
        $scope.accent = color;
    };
    $mdTheming.generateTheme('altTheme');
    $mdTheming.generateTheme('altTheme2');
    $mdTheming.generateTheme('primary');

    $scope.goToPerson = function (person, ev) {
        $scope.toggleRight2();
        var elmnt = document.getElementById("chatBox");
        elmnt.scrollTop = 500;
        $scope.Chat_Person = person;
    };
    $scope.Back_To_Chat = function () {
        $scope.toggleRight2();
    }
    $scope.Send_message = function (mesg) {
        if (mesg) {
            $scope.my_message = null;
            $scope.Chat_Person.messages.push({
                msg: mesg,
                Time: $filter('date')(new Date(), 'hh.mm a'),
                From: "me",
                Date: new Date()
            });
        }
    }
    $scope.toggleRight2 = buildDelayedToggler('right2');
    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function () {
        return $mdSidenav('right').isOpen();
    };

    function debounce(func, wait, context) {
        var timer;

        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function () {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }


    function buildDelayedToggler(navID) {
        return debounce(function () {

            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function () {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }
}


function titleCase() {
    return function (input) {
        input = input || '';
        return input.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    };
}

function themePreview() {
    return {
        restrict: 'E',
        templateUrl: '../views/colorpicker.tmpl.html',
        scope: {
            primary: '=',
            accent: '='
        },
        controller: function ($scope, $mdColors, $mdColorUtil) {
            $scope.getColor = function (color) {
                return $mdColorUtil.rgbaToHex($mdColors.getThemeColor(color))
            };
        }
    }
}

function scrollToBottom($timeout, $window) {
    return {
        scope: {
            scrollToBottom: "="
        },
        restrict: 'A',
        link: function (scope, element, attr) {
            scope.$watchCollection('scrollToBottom', function (newVal) {
                if (newVal) {
                    $timeout(function () {
                        element[0].scrollTop = element[0].scrollHeight + 10;
                    }, 0);
                }
            });
        }
    };
}

function spyStyle($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(function () {
                    return element.css(attrs['spyAttribute']);
                }, styleChangedCallBack,
                true);
            function styleChangedCallBack(newValue, oldValue) {
                if (newValue !== oldValue) {
                    var x = document.querySelectorAll(".md-toolbar_icon");
                    angular.forEach(x, function (item) {
                        $timeout(function () {
                            item.style.color = newValue;
                        }, 0);
                    });
                }
            }

        }
    };
}

function outsideClick($document, $parse, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $element, $attributes) {
            var onDocumentClick = function (event) {
                var offsetLeft = getOffsetLeft($element);
                var offsetTop = getOffsetTop($element);
                if (((event.target.id != $element[0].id && $parse($attributes.ngShow)($scope))) || event.target.id == $element[0].id + '_icon') {
                    $timeout(function () {
                        if (!(event.clientY > offsetTop && event.clientY < parseInt(offsetTop + $element["0"].clientHeight)) || !(event.clientX > offsetLeft && event.clientX < parseInt(offsetLeft + $element["0"].clientWidth)) || event.target.id == $element[0].id + '_icon') {
                            $scope[$attributes.ngShow] = !$scope[$attributes.ngShow];
                            $scope.$apply();
                        }
                    }, 10)
                };
            }
            function getOffsetLeft(elem) {
                elem = elem[0];
                var offsetLeft = 0;
                do {
                    if (!isNaN(elem.offsetLeft)) {
                        offsetLeft += elem.offsetLeft;
                    }
                } while (elem = elem.offsetParent);
                return offsetLeft;
            }
            function getOffsetTop(elem) {
                elem = elem[0];
                var offsetTop = 0;
                do {
                    if (!isNaN(elem.offsetTop)) {
                        offsetTop += elem.offsetTop;
                    }
                } while (elem = elem.offsetParent);
                return offsetTop;
            }
            $document.on("click", onDocumentClick);
            if (_hasTouch()) {
                $document.on('touchstart', eventHandler);
            }
            $element.on('$destroy', function () {
                if (_hasTouch()) {
                    $document.off('touchstart', eventHandler);
                }
                $document.off("click", onDocumentClick);

            });
            function _hasTouch() {
                return 'ontouchstart' in window || navigator.maxTouchPoints;
            };
        }
    }
}

function LeftCtrl($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });

    }
}

function RightCtrl($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
        $mdSidenav('right').close()
            .then(function () {
                $log.debug("close RIGHT is done");
            });
    };
}