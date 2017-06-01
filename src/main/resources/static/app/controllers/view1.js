'use strict';

angular.module('angular-c3-simple', [])

.service('c3SimpleService', [function () {
    return {};
}])

.directive('c3Simple', ['c3SimpleService', '$timeout', function (c3SimpleService, $timeout) {
    return {

        restrict: 'EA',
        scope: {
            config: '='
        },
        template: '<div></div>',
        replace: true,
        controller: ['$scope', '$element', function ($scope, $element) {

            $scope.$watch($element, function () {

                if ('' === $element[0].id) {
                    return;
                }
                $scope.config.bindto = '#' + $element[0].id;

                $scope.$watch('config', function (newConfig, oldConfig) {
                    if (c3SimpleService[$scope.config.bindto])
                        c3SimpleService[$scope.config.bindto].destroy();

                    $timeout(function () {
                        c3SimpleService[$scope.config.bindto] = c3.generate(newConfig);
                        setTimeout(function () {
                            c3SimpleService[$scope.config.bindto].load(newConfig.data);
                        }, 10500);

                        if (!newConfig.size) {
                            c3SimpleService[$scope.config.bindto].resize();
                        }

                    });

                    $scope.$watch('config.data', function (newData, oldData) {
                        if ($scope.config.bindto) {
                            $timeout(function () {
                                c3SimpleService[$scope.config.bindto].load(newData);
                            });
                        }
                    }, true);
                }, true);
            });
        }]
    };
}]);



'use strict';
angular.module('MainApp.view1', ['angular-c3-simple', 'kendo.directives', 'ng-fusioncharts', 'ngSanitize'])
.service('Load_document', ['$rootScope', function () {
        var service = {
            Start: Start,
            Stop: Stop
        };
        return service

        function Start($rootScope) { $rootScope.Load_Document = true; }
        function Stop($rootScope) { $rootScope.Load_Document = false; }
    }])
.controller('View1Ctrl', ['$scope', 'c3SimpleService', '$timeout', 'Load_document', '$rootScope', function ($scope, c3SimpleService, $timeout, Load_document, $rootScope,  $element) {
    Load_document.Start($rootScope);
    $scope.date = new Date();
    $scope.Traffic = {
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
                ['data2', 130, 100, 140, 200, 150, 50]
            ],
            types: {
                data1: 'area-spline',
                data2: 'area-spline'
            }

        },
        color: {

            pattern: ['#ffffff', '#aec7e8']
        },
        grid: {
            x: {
                show: false
            },
            y: {
                show: true
            }
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    }

    $scope.labels = ["0", "1", "2", "3", "4", "5",
        "6", '7', '8', '9', '10', '11', '12', '13', '14', '15', '16',
        '17', '18', '19', '20', '21', '22', '23'];
    $scope.series = ['Series A'];
    $scope.data = [
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
    $scope.options = {
        scales: {
            yAxes: [
                {
                    id: 'y-axis-1',
                    type: 'linear',
                    display: true,
                    position: 'left'
                }
            ]
        }
    };

    $scope.todayDataSource = {
        "chart": {
            "caption": "Активность за день",
            "captionFontSize": "23",
            "captionPadding": "25",
            "baseFontSize": "10",
            "canvasBorderAlpha": "0",
            "showPlotBorder": "0",
            "placevaluesInside": "1",
            "valueFontColor": "#ffffff",
            "captionFontBold": "0",
            "bgColor": "#2196F3",
            "divLineAlpha": "100",
            "plotSpacePercent": "10",
            "bgAlpha": "100",
            "canvasBgAlpha": "0",
            "outCnvBaseFontColor": "#FFFFFF",
            "showValues": "0",
            "baseFont": "Open Sans",
            "paletteColors": "#FF6347",
            "theme": "zune",

            "toolTipBorderColor": "#FFFFFF",
            "toolTipBorderThickness": "1",
            "toolTipBorderRadius": "2",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "70",
            "toolTipPadding": "12",
            "toolTipSepChar": " - ",

            "xAxisNameFontSize": "14",
            "yAxisNameFontSize": "14",
            "xAxisNamePadding": "10",
            "yAxisNamePadding": "10",
            "xAxisName": "Время",
            "yAxisName": "Выполненных задач",
            "xAxisNameFontBold": "0",
            "yAxisNameFontBold": "0",
            "showXAxisLine": "1",
            "xAxisLineColor": "#ffffff",
        },
        "data": [{
            "label": "0:00",
            "value": "0"
        }, {
            "label": "1:00",
            "value": "0"
        }, {
            "label": "2:00",
            "value": "0"
        }, {
            "label": "3:00",
            "value": "0"
        }, {
            "label": "4:00",
            "value": "0"
        }, {
            "label": "5:00",
            "value": "0"
        }, {
            "label": "6:00",
            "value": "0"
        }, {
            "label": "7:00",
            "value": "0"
        }, {
            "label": "8:00",
            "value": "2"
        }, {
            "label": "9:00",
            "value": "0"
        }, {
            "label": "10:00",
            "value": "0"
        }, {
            "label": "11:00",
            "value": "1"
        }, {
            "label": "12:00",
            "value": "0"
        }, {
            "label": "13:00",
            "value": "2"
        }, {
            "label": "14:00",
            "value": "0"
        }, {
            "label": "15:00",
            "value": "0"
        }, {
            "label": "16:00",
            "value": "0"
        }, {
            "label": "17:00",
            "value": "1"
        }, {
            "label": "18:00",
            "value": "0"
        }, {
            "label": "19:00",
            "value": "0"
        }, {
            "label": "20:00",
            "value": "0"
        }, {
            "label": "21:00",
            "value": "0"
        }, {
            "label": "22:00",
            "value": "0"
        }, {
            "label": "23:00",
            "value": "0"
        }]
    };

    $scope.monthDataSource = {
        "chart": {
            "caption": "Активность за месяц",
            "captionFontSize": "23",
            "captionPadding": "25",
            "baseFontSize": "10",
            "canvasBorderAlpha": "0",
            "showPlotBorder": "0",
            "placevaluesInside": "1",
            "valueFontColor": "#ffffff",
            "captionFontBold": "0",
            "bgColor": "#00BCD4",
            "divLineAlpha": "100",
            "plotSpacePercent": "10",
            "bgAlpha": "100",
            "canvasBgAlpha": "0",
            "outCnvBaseFontColor": "#FFFFFF",
            "showValues": "0",
            "baseFont": "Open Sans",
            "paletteColors": "#FF6347",
            "theme": "zune",

            // tool-tip customization
            "toolTipBorderColor": "#FFFFFF",
            "toolTipBorderThickness": "1",
            "toolTipBorderRadius": "2",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "70",
            "toolTipPadding": "12",
            "toolTipSepChar": " - ",
            // axis customization
            "xAxisNameFontSize": "14",
            "yAxisNameFontSize": "14",
            "xAxisNamePadding": "10",
            "yAxisNamePadding": "10",
            "xAxisName": "День",
            "yAxisName": "Выполненных задач",
            "xAxisNameFontBold": "0",
            "yAxisNameFontBold": "0",
            "showXAxisLine": "1",
            "xAxisLineColor": "#ffffff",
        },
        data: []
    };

    for (var i = 0; i < 30; i++) {
        $scope.monthDataSource.data.push({
            label: (i+1),
            value: getRandomInt(3, 7)
        })
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    $scope.yearDataSource = {
        "chart": {
            "caption": "Активность за год",
            "captionFontSize": "23",
            "captionPadding": "25",
            "baseFontSize": "10",
            "canvasBorderAlpha": "0",
            "showPlotBorder": "0",
            "placevaluesInside": "1",
            "valueFontColor": "#ffffff",
            "captionFontBold": "0",
            "bgColor": "#009688",
            "divLineAlpha": "100",
            "plotSpacePercent": "10",
            "bgAlpha": "100",
            "canvasBgAlpha": "0",
            "outCnvBaseFontColor": "#FFFFFF",
            "showValues": "0",
            "baseFont": "Open Sans",
            "paletteColors": "#FF6347",
            "theme": "zune",

            // tool-tip customization
            "toolTipBorderColor": "#FFFFFF",
            "toolTipBorderThickness": "1",
            "toolTipBorderRadius": "2",
            "toolTipBgColor": "#000000",
            "toolTipBgAlpha": "70",
            "toolTipPadding": "12",
            "toolTipSepChar": " - ",
            // axis customization
            "xAxisNameFontSize": "14",
            "yAxisNameFontSize": "14",
            "xAxisNamePadding": "10",
            "yAxisNamePadding": "10",
            "xAxisName": "Месяц",
            "yAxisName": "Выполненных задач",
            "xAxisNameFontBold": "0",
            "yAxisNameFontBold": "0",
            "showXAxisLine": "1",
            "xAxisLineColor": "#ffffff",
        },
        "data": [{
            "label": "Январь",
            "value": "31"
        }, {
            "label": "Февраль",
            "value": "43"
        }, {
            "label": "Март",
            "value": "52"
        }, {
            "label": "Апрель",
            "value": "25"
        }, {
            "label": "Май",
            "value": "18"
        }, {
            "label": "Июнь",
            "value": "64"
        }, {
            "label": "Июль",
            "value": "37"
        }, {
            "label": "Август",
            "value": "29"
        }, {
            "label": "Сентябрь",
            "value": "25"
        }, {
            "label": "Октябрь",
            "value": "34"
        }, {
            "label": "Ноябрь",
            "value": "26"
        }, {
            "label": "Декабрь",
            "value": "20"
        }]
    };

    $scope.Growth = {
        data: {
            columns: [
                ['data1', 30, 20, 10, 40, 15, 25, 13, 10, 14, 20, 26],
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }

        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };
    $scope.Commits = {
        data: {
            columns: [
                ['data1', 30, 20, 10, 40, 15, 25, 13, 10, 14, 20, 26],
            ],
            type: 'spline'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };
    $scope.Clients = {
        data: {
            columns: [
                ['data1', 50, -30, 40, -20, 30, -25, 33, -50, -40, 20, 46],
            ],
            type: 'bar'
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };
    $scope.Invoice = {
        data: {
            columns: [
                ['data1', 40, 20, 14, 30, 20, 25, 26, 10, 40, 20, 25],
                ['data2', 30, 40, 10, 40, 15, 25, 15, 10, 14, 20, 26]
            ],
            types: {
                data1: 'spline',
                data2: 'bar',
            },
        },
        bar: {
            width: {
                ratio: 0.5
            }
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        },
        legend: {
            show: false
        },
        tooltip: {
            show: false
        }
    };

    $scope.chart = {
        data: {
            columns: [
                ['data1', 30, 200, 100, 400, 150, 250],
            ]
        },
        axis: {
            x: {
                show: false
            }, y: {
                show: false
            }
        }
    };
    $scope.Donut = {
        data: {
            columns: [
                ['vinoth', 30],
                ['vivek', 120],
                ['arun', 120]
            ],
            type: 'donut',
            onclick: function (d, i) { },
            onmouseover: function (d, i) {; },
            onmouseout: function (d, i) { }
        },

        donut: {
            width: 50,
        },
        tooltip: {
            contents: function (d) { return '<img class="md-user-avatar" src="app/assets/' + d[0].id + '.jpg"  md-whiteframe="20">' },
        }
    }
    $scope.Change = true;

    $timeout(function () { Load_document.Stop($rootScope); }, 1500)

}]);
