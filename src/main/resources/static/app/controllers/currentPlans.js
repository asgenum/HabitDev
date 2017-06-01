'use strict';

angular.module('MainApp.view1')
    .controller('CurrentPlansController', ['$http', '$scope', '$timeout', 'Load_document',
        '$rootScope', 'UserStorageService', '$mdDialog',
        function ($http, $scope, $timeout, Load_document, $rootScope, UserStorageService, $mdDialog) {
            Load_document.Start($rootScope);

            $scope.gridOptions = undefined;
            $scope.gridTasksOptions = undefined;
            $scope.plansData = [];
            $scope.tasks = [];
            $scope.observableArray = new kendo.data.ObservableArray([]);
            $scope.html = '';
            $scope.isEdited = false;
            $scope.isSelected = false;
            $scope.selectedPlan = undefined;
            $scope.binaryList = [{
                id: 0,
                name: 'Off'
            }, {
                id: 1,
                name: 'On'
            }];

            $scope.statusList = [{
                id: 0,
                name: 'Не выполняется'
            }, {
                id: 1,
                name: 'Выполняется'
            }];

            $scope.ratingList = [{
                id: 0,
                name: '0'
            }, {
                id: 1,
                name: '1'
            }, {
                id: 2,
                name: '2'
            }, {
                id: 3,
                name: '3'
            }, {
                id: 4,
                name: '4'
            }, {
                id: 5,
                name: '5'
            }];


            getActionPlansData();


            function getActionPlansData() {
                $http.get('plan/userplan', UserStorageService.user).success(function (res) {
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
                    setTasksGridOptions([]);
                }).error(function (error) {
                    $scope.message = error.message;
                });
            }

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
                                    endDate: {type: 'date', validation: {required: true}}
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
                    }, {
                        field: 'rating', title: 'Рейтинг',
                        template: getRating, editor: ratingDropDown
                    }, {
                        command: ['edit'], title: '', width: '295px'
                    }],
                    editable: 'inline',
                    save: function (element) {
                        console.log(element);

                        var actionPlan = {
                            id: element.model.id,
                            name: element.model.name,
                            description: element.model.description,
                            numberOfTasks: element.model.numberOfTasks,
                            startTime: element.model.startDate.getTime(),
                            endTime: element.model.endDate.getTime(),
                            status: element.model.status,
                            onlineAccess: element.model.onlineAccess,
                            creatorId: UserStorageService.user.id
                        };

                        $http.put('plan/update', actionPlan).success(function (res) {
                            console.log('updating Success');
                        });

                    },
                    change: function (element) {
                        var selectedRows = this.select();
                        var selectedId = undefined;
                        for (var i = 0; i < selectedRows.length; i++) {
                            var dataItem = this.dataItem(selectedRows[i]);
                            selectedId = dataItem.id;
                        }
                        $scope.selectedPlan = selectedId;
                        for (var plan of $scope.plansData) {
                            if (plan.id == selectedId) {
                                $scope.tasks = plan.tasks;
                                break;
                            }
                        }
                        console.log($scope.observableArray);
                        $scope.observableArray.empty();
                        for (var elem of $scope.tasks) {
                            $scope.observableArray.push(elem);
                        }
                        console.log($scope.tasks);
                        setTasksGridOptions();
                        $scope.isSelected = true;
                        $scope.kgTasks.refresh();
                    }
                };
            }

            function ratingDropDown(container, options) {
                $('<input data-text-field="name" data-value-field="id" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.ratingList,
                        valuePrimitive: true
                    });
            }

            function getRating(item) {
                for (var i = 0, length = $scope.ratingList; i < length; i++) {
                    console.log($scope.ratingList[i].id);
                    if ($scope.ratingList[i].id === item.id) {
                        return $scope.ratingList[i].name;
                    }
                }
                return '';
            }

            function dateTimeEditor(container, options) {
                $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({});
            }

            function setTasksGridOptions() {
                $scope.gridTasksOptions = {
                    dataSource: {
                        data: $scope.observableArray,
                        schema: {
                            model: {
                                id: 'id',
                                fields: {
                                    id: {type: 'number', editable: false},
                                    name: {type: 'string', editable: false},
                                    description: {type: 'string', editable: false},
                                    startTime: {type: 'date', validation: {required: true}},
                                    endTime: {type: 'date', validation: {required: true}},
                                    performed: {type: 'boolean', editable: false},
                                    overdue: {type: 'boolean', editable: false},
                                    content: {type: 'string', editable: false}
                                }
                            }
                        },
                        pageSize: 20
                    },
                    scrollable: true,
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
                        field: 'startTime', title: 'Дата начала',
                        format: "{0:yyyy-M-dd hh:mm:ss tt}", editor: dateTimeEditor
                    }, {
                        field: 'endTime', title: 'Дата окончания',
                        format: "{0:yyyy-M-dd hh:mm:ss tt}", editor: dateTimeEditor
                    }, {
                        field: 'performed', title: 'Статус выполнения'
                    }, {
                        field: 'overdue', title: 'Выполнение просрочено'
                    }, {
                        command: ['edit'], title: '', width: '295px'
                    }],
                    editable: 'inline',
                    save: function (element) {
                        console.log(element);
                        $scope.isEdited = false;
                        if ($scope.selectedPlan) {
                            var task = {
                                id: element.model.id,
                                name: element.model.name,
                                description: element.model.description,
                                startTime: element.model.startTime.getTime(),
                                endTime: element.model.endTime.getTime(),
                                performed: element.model.performed,
                                overdue: element.model.overdue,
                                content: element.model.content,
                                notificationSend: element.model.notificationSend
                            };

                            $http.put('task/update', task).success(function (res) {
                                console.log('updating Success');
                            });
                        }
                    }
                };
            }

            $timeout(function () {
                Load_document.Stop($rootScope);
            }, 1500)
        }]);