'use strict';

angular.module('MainApp.view1')
    .controller('UsersStatisticController', ['$http', '$scope', '$timeout', 'Load_document',
        '$rootScope', 'UserStorageService', '$mdDialog', '$mdToast',
        function ($http, $scope, $timeout, Load_document, $rootScope, UserStorageService, $mdDialog, $mdToast) {
            Load_document.Start($rootScope);

            $scope.gridOptions = undefined;
            $scope.gridTasksOptions = undefined;
            $scope.plansData = [];
            $scope.tasks = [];
            $scope.selectedPlan = undefined;
            $scope.observableArray = new kendo.data.ObservableArray([]);

            getActionPlansData();


            function getActionPlansData() {
                $http.get('plan/creator/' + UserStorageService.user.id).success(function (res) {

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
                            tasks: []
                        };
                        var numberOfSuccessTasks = 0;
                        var numberOfOverdueTasks = 0;

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

                            if (object.performed) {
                                numberOfSuccessTasks++;
                            } else if (object.overdue) {
                                numberOfOverdueTasks++;
                            }
                        }


                        currentPlan.numberOfSuccessTasks = numberOfSuccessTasks;
                        currentPlan.numberOfOverdueTasks = numberOfOverdueTasks;

                        $scope.plansData.push(currentPlan);

                        $http.get('userbyplan/' + plan.id).success(function (user) {
                            console.log(user);
                            var tempPlan = $scope.plansData.pop();
                            tempPlan.username = user.firstName + ' ' + user.lastName;
                            tempPlan.email = user.email;
                            $scope.observableArray.push(tempPlan);
                        });

                    }
                    setGridOptions();
                }).error(function (error) {
                    $scope.message = error.message;
                });
            }


            function setGridOptions() {
                $scope.gridOptions = {
                    dataSource: {
                        data: $scope.observableArray,
                        schema: {
                            model: {
                                id: 'id',
                                fields: {
                                    id: {type: 'number', editable: false, min: 1},
                                    name: {type: 'string', editable: false},
                                    username: {type: 'string', editable: false},
                                    email: {type: 'string', editable: false},
                                    numberOfTasks: {type: 'number', editable: false},
                                    numberOfSuccessTasks: {type: 'number', editable: false},
                                    numberOfOverdueTasks: {type: 'number', editable: false}
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
                        field: 'username', title: 'Имя'
                    }, {
                        field: 'email', title: 'Email'
                    }, {
                        field: 'name', title: 'Название курса'
                    }, {
                        field: 'numberOfTasks', title: 'Количество занятий'
                    }, {
                        field: 'numberOfSuccessTasks', title: 'Выполненных заданий'
                    }, {
                        field: 'numberOfOverdueTasks', title: 'Просроченных заданий'
                    }]
                };
            }

            $timeout(function () {
                Load_document.Stop($rootScope);
            }, 1500)
        }]);