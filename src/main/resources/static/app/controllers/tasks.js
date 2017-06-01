'use strict';

angular.module('MainApp.view1')
    .controller('TasksController', ['$http', '$scope', '$timeout', 'Load_document',
        '$rootScope', 'UserStorageService','$mdDialog',
        function ($http, $scope, $timeout, Load_document, $rootScope, UserStorageService, $mdDialog) {
            Load_document.Start($rootScope);

            $scope.tasks = [];
            $scope.currentDate = new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + new Date().getDate());

            function checkTasks() {
                $http.get('plan/userplan', UserStorageService.user).success(function (res) {
                    for(var plan of res) {
                        $scope.tasks = plan.tasks;
                        console.log($scope.tasks);
                        for (var element of $scope.tasks) {
                            var object = {
                                id: element.id,
                                title: element.name,
                                description: element.description,
                                start: new Date(element.startTime),
                                end: new Date(element.endTime),
                                content: element.content,
                                notificationSend: element.notificationSend,
                                overdue: element.overdue,
                                performed: element.performed
                            };
                            var currentDate = new Date();

                            if(object.overdue) {
                                object.ownerId = 3;
                            } else if(object.performed) {
                                object.ownerId = 2;
                            } else if(currentDate.getTime() >= object.start.getTime()
                                && currentDate.getTime() <= object.end.getTime()){
                                object.ownerId = 1;
                            } else{
                                object.ownerId = 4;
                            }
                            $scope.dataSource.add(object);
                        }
                    }

                }).error(function (error) {
                    $scope.message = error.message;
                });
            }


            checkTasks();

            $scope.dataSource = new kendo.data.SchedulerDataSource({
                data: $scope.tasks
            });

            $scope.scheduler_change = function (e) {
                var start = e.start;
                var end = e.end;
                var slots = e.slots;
                var events = e.events;

                var message = "change:: selection from {0:g} till {1:g}";

                if (events.length) {
                    message += ". The selected event is '" + events[events.length - 1].content + "'";

                    $scope.selectedTask = events[events.length - 1];
                    $scope.content = $scope.selectedTask.content;
                    $scope.headerContent = $scope.selectedTask.description;
                    var currentDate = new Date();
                    if(currentDate.getTime() >= $scope.selectedTask.start.getTime() && currentDate.getTime() <= $scope.selectedTask.end.getTime()){
                        $scope.showAdvanced();
                    }
                }

                console.log(kendo.format(message, start, end));
            };

            $scope.schedulerOptions = {
                date: $scope.currentDate,
                startTime: new Date($scope.currentDate.toDateString() + ' 0:00:00 AM'),
                height: 600,
                views: [
                    "day",
                    "workWeek",
                    {type: "week", selected: true},
                    "month"
                ],
                timezone: 'Etc/UTC',
                selectable: true,
                change: $scope.scheduler_change,
                dataSource: $scope.dataSource,
                editable: false,
                resources: [
                {
                    field: "ownerId",
                    title: "Owner",
                    dataSource: [
                        { text: "Available", value: 1, color: "#7B68EE"},
                        { text: "Done", value: 2, color: "#008000" },
                        { text: "Overdue", value: 3, color: "#FF0000" },
                        { text: "notAvailable", value: 4, color: "#696969" }
                    ]
                }
            ]
            };

            $scope.showAdvanced = function (ev) {
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'app/views/information.tmpl.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: true,
                        fullscreen: false,
                        locals: {
                            item: $scope.content,
                            header: $scope.headerContent
                        }
                    })
                    .then(function (answer) {
                        if(answer){
                            console.log($scope.selectedTask.id);
                            $http.put('task/performed/' + $scope.selectedTask.id).success(function (res) {
                                $scope.selectedTask.ownerId = 2;
                                console.log(res);
                            }).error(function (error) {
                                $scope.message = error.message;
                            });
                        }
                    }, function () {
                        console.log('You cancelled the dialog.');
                    });
            };

            function DialogController($scope, $mdDialog, item, header) {
                $scope.item = item;
                $scope.headerContent = header;

                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.answer = function (answer) {
                    $mdDialog.hide(answer);
                };
            }


            $timeout(function () {
                Load_document.Stop($rootScope);
            }, 1500)
        }]);