'use strict';

angular.module('MainApp.view1')
    .controller('UsersPlansController', ['$http', '$scope', '$timeout', 'Load_document',
        '$rootScope', 'UserStorageService', '$mdDialog', '$mdToast',
        function ($http, $scope, $timeout, Load_document, $rootScope, UserStorageService, $mdDialog, $mdToast) {
            Load_document.Start($rootScope);

            $scope.gridOptions = undefined;
            $scope.gridTasksOptions = undefined;
            $scope.plansData = [];
            $scope.tasks = [];
            $scope.selectedPlan = undefined;

            getActionPlansData();


            function getActionPlansData() {
                $http.get('plan/onlineplans').success(function (res) {
                    console.log(res);
                    for (var plan of res) {
                        var currentPlan = {
                            id: plan.id,
                            name: plan.name,
                            numberOfTasks: plan.numberOfTasks,
                            description: plan.description,
                            startDate: new Date(plan.startTime),
                            endDate: new Date(plan.endTime),
                            status: plan.status,
                            onlineAccess: plan.onlineAccess,
                            creatorId: plan.creatorId,
                            tasks: [],
                            rating: getRandomInt(1, 250)
                        };
                        var tasks = plan.tasks;
                        for (var element of tasks) {
                            var object = {
                                id: element.id,
                                name: element.name,
                                description: element.description,
                                startTime: new Date(element.startTime),
                                endTime: new Date(element.endTime),
                                content: element.content,
                                notificationSend: element.notificationSend,
                                overdue: element.overdue,
                                performed: element.performed
                            };

                            currentPlan.tasks.push(object);
                        }
                        $scope.plansData.push(currentPlan);
                    }
                    setGridOptions();
                }).error(function (error) {
                    $scope.message = error.message;
                });
            }

            $scope.doSomething = function($event) {

                var sender = $event.currentTarget;

                var row = angular.element(sender).closest("tr");

                var dataItem = $scope.kendo.myGrid.dataItem(row);

                console.log(dataItem);

                $http.post('plan/copy/' + UserStorageService.user.id + '/' + dataItem.id).success(function (res) {
                    console.log(res);
                    if(res.length == 0) {
                        $scope.showSimpleToast('Вы уже используете данный план');
                    }else{
                        $scope.showSimpleToast('Действие успешно');
                    }
                });
            };

            function setGridOptions() {
                $scope.gridOptions = {
                    dataSource: {
                        data: $scope.plansData,
                        schema: {
                            model: {
                                id: 'id',
                                fields: {
                                    id: {type: 'number', editable: false, min: 1},
                                    name: {type: 'string', editable: false},
                                    description: {type: 'string', editable: false},
                                    numberOfTasks: {type: 'number', editable: false},
                                    startDate: {type: 'date', validation: {required: true}},
                                    endDate: {type: 'date', validation: {required: true}},
                                    rating: {type: 'number', editable: false}

                                }
                            }
                        },
                        pageSize: 20
                    },
                    scrollable: true,
                    selectable: true,
                    sortable: true,
                    height: 650,
                    resizable: true,
                    reorderable: true,
                    columnMenu: true,
                    filterable: {
                        mode: "row"
                    },
                    groupable: true,
                    pageable: {
                        input: true,
                        numeric: false
                    },
                    columns: [{
                        field: 'name', title: 'Название'
                    }, {
                        field: 'description', title: 'Краткое описание'
                    }, {
                        field: 'numberOfTasks', title: 'Количество занятий'
                    }, {
                        field: 'startDate', title: 'Дата начала'
                    }, {
                        field: 'endDate', title: 'Дата окончания'
                    },{
                        field: 'rating', title: 'Рейтинг плана'
                    },{
                        command: [{
                            template: "<span class='k-button' ng-click='doSomething($event)'>Использовать</span>"
                        }],
                        title: " "
                    }],
                    change: function (element) {
                        var selectedRows = this.select();
                        var selectedId = undefined;
                        for (var i = 0; i < selectedRows.length; i++) {
                            var dataItem = this.dataItem(selectedRows[i]);
                            selectedId = dataItem.id;
                        }
                        $scope.selectedPlan = selectedId;

                    }
                };
            }

            var last = {
                bottom: false,
                top: true,
                left: false,
                right: true
            };

            $scope.toastPosition = angular.extend({},last);

            $scope.getToastPosition = function() {
                sanitizePosition();

                return Object.keys($scope.toastPosition)
                    .filter(function(pos) { return $scope.toastPosition[pos]; })
                    .join(' ');
            };

            function sanitizePosition() {
                var current = $scope.toastPosition;

                if ( current.bottom && last.top ) current.top = false;
                if ( current.top && last.bottom ) current.bottom = false;
                if ( current.right && last.left ) current.left = false;
                if ( current.left && last.right ) current.right = false;

                last = angular.extend({},current);
            }

            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            $scope.showSimpleToast = function(text) {
                var pinTo = $scope.getToastPosition();

                $mdToast.show(
                    $mdToast.simple()
                        .textContent(text)
                        .position(pinTo )
                        .hideDelay(3000)
                );
            };


            $timeout(function () {
                Load_document.Stop($rootScope);
            }, 1500)
        }]);