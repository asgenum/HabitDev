'use strict';

angular.module('MainApp.view1')
    .controller('MyPlansController', ['$http', '$scope', '$timeout', 'Load_document',
        '$rootScope', 'UserStorageService','$mdDialog',
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


            getActionPlansData();


            function getActionPlansData() {
                $http.get('plan/creatorplans/' + UserStorageService.user.id).success(function (res) {
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
                                    name: {type: 'string', validation: {required: true}},
                                    description: {type: 'string', validation: {required: true}},
                                    numberOfTasks: {type: 'number', editable: false},
                                    startDate: {type: 'date', validation: {required: true}},
                                    endDate: {type: 'date', validation: {required: true}},
                                    onlineAccess: {type: 'boolean', validation: {required: true}},
                                    status: {type: 'boolean', validation: {required: true}}
                                }
                            }
                        },
                        pageSize: 20
                    },
                    scrollable: true,
                    selectable: true,
                    sortable: true,
                    height: 650,
                    toolbar: ["create"],
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
                        field: 'onlineAccess', title: 'Общий доступ',
                        template: getAccess, editor: accessDropDown
                    }, {
                        field: 'status', title: 'Статус выполнения',
                        template: getStatus, editor: statusDropDown
                    }, {
                        command: ['edit', 'destroy'], title: '', width: '295px'
                    }],
                    editable: 'inline',
                    remove: function (element) {
                        console.log(element);
                        $http.delete('plan/delete/' + element.model.id).success(function (res) {
                            console.log('deleting Success');
                        });
                    },
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

                        if(element.model.id != 0) {
                            $http.put('plan/update', actionPlan).success(function (res) {
                                console.log('updating Success');
                            });
                        } else {
                            $http.post('plan/create', actionPlan).success(function (res) {
                                console.log('create Success');
                            });
                        }
                    },
                    saveChanges: function (element) {
                        console.log(element);
                    },
                    change: function (element) {
                        var selectedRows = this.select();
                        var selectedId = undefined;
                        for (var i = 0; i < selectedRows.length; i++) {
                            var dataItem = this.dataItem(selectedRows[i]);
                            selectedId = dataItem.id;
                        }
                        $scope.selectedPlan = selectedId;
                        for(var plan of $scope.plansData) {
                            if(plan.id == selectedId) {
                                $scope.tasks = plan.tasks;
                                break;
                            }
                        }
                        console.log($scope.observableArray);
                        $scope.observableArray.empty();
                        for(var elem of $scope.tasks) {
                            $scope.observableArray.push(elem);
                        }
                        console.log($scope.tasks);
                        setTasksGridOptions();
                        $scope.isSelected = true;
                        $scope.kgTasks.refresh();
                    }
                };
            }

            function accessDropDown(container, options) {
                $('<input data-text-field="name" data-value-field="id" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.binaryList,
                        valuePrimitive: true
                    });
            }

            function getAccess(item) {
                for (var i = 0, length = $scope.binaryList; i < length; i++) {
                    console.log($scope.binaryList[i].id);
                    if ($scope.binaryList[i].id === item.id) {
                        return $scope.binaryList[i].name;
                    }
                }
                return '';
            }
            function statusDropDown(container, options) {
                $('<input data-text-field="name" data-value-field="id" data-bind="value:' + options.field + '"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "name",
                        dataValueField: "id",
                        dataSource: $scope.statusList,
                        valuePrimitive: true
                    });
            }

            function getStatus(item) {
                for (var i = 0, length = $scope.statusList; i < length; i++) {
                    console.log($scope.statusList[i].id);
                    if ($scope.statusList[i].id === item.id) {
                        return $scope.statusList[i].name;
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
                                    name: {type: 'string', validation: {required: true}},
                                    description: {type: 'string', validation: {required: true}},
                                    startTime: {type: 'date', validation: {required: true}},
                                    endTime: {type: 'date', validation: {required: true}},
                                    performed: {type: 'boolean', editable: false},
                                    overdue: {type: 'boolean', editable: false},
                                    content: {type: 'string'}
                                }
                            }
                        },
                        pageSize: 20
                    },
                    scrollable: true,
                    sortable: true,
                    height: 650,
                    toolbar: ["create"],
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
                        format:"{0:yyyy-M-dd hh:mm:ss tt}", editor: dateTimeEditor
                    }, {
                        field: 'endTime', title: 'Дата окончания',
                        format:"{0:yyyy-M-dd hh:mm:ss tt}", editor: dateTimeEditor
                    }, {
                        field: 'performed', title: 'Статус выполнения'
                    },{
                        field: 'overdue', title: 'Выполнение просрочено'
                    }, {
                        command: ['edit', 'destroy'], title: '', width: '295px'
                    }],
                    editable: 'inline',
                    remove: function (element) {
                        console.log(element);
                    },
                    save: function (element) {
                        console.log(element);
                        $scope.isEdited = false;
                        if($scope.selectedPlan) {
                            var task = {
                                id: element.model.id,
                                name: element.model.name,
                                description: element.model.description,
                                startTime: element.model.startTime.getTime(),
                                endTime: element.model.endTime.getTime(),
                                performed: element.model.performed,
                                overdue: element.model.overdue,
                                content: $scope.html,
                                notificationSend: element.model.notificationSend
                            };

                            if(element.model.id != 0) {
                                $http.put('task/update', task).success(function (res) {
                                    console.log('updating Success');
                                });
                            } else{
                                task.id = $scope.selectedPlan;
                                $http.post('task/create', task).success(function (res) {
                                    $http.put('plan/updatestate/' + $scope.selectedPlan).success(function (res) {
                                        console.log('create and update Success');
                                    });
                                });
                            }
                        }
                    },
                    change: function (element) {
                        var selectedRows = this.select();
                        for (var i = 0; i < selectedRows.length; i++) {
                            var dataItem = this.dataItem(selectedRows[i]);
                            console.log(dataItem);
                        }
                    },
                    beforeEdit: function (element) {
                        var content = element.model.content;
                        $scope.html = content;
                        $scope.isEdited = true;
                    }

                };
            }


            $timeout(function () {
                Load_document.Stop($rootScope);
            }, 1500)
        }]);