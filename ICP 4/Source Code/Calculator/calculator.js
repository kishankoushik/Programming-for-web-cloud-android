var app =angular.module('calcApp',['ngSanitize']);

app.controller('calcController',function ($scope) {
    var elementsArray = [];

    clear();

    function clear() {
        $scope.eqtn = "";
        $scope.numb = "";
        elementsArray = [];
    }

    function clearNumber() {
        $scope.numb = "";
    };
    // addition
    function equationAdd(a, b) {
        elementsArray.push(a);
        elementsArray.push(b);
        $scope.eqtn += a;
        $scope.eqtn += b;
    }
//mulltiplication
    function multiply(a, b) {
        var c = parseInt(elementsArray[a]) * parseInt(elementsArray[b]);
        elementsArray[a] = c.toString();
        elementsArray.splice(a + 1, 2);
    }
//division
    function divide(a, b) {
        var c = parseInt(elementsArray[a]) / parseInt(elementsArray[b]);
        elementsArray[a] = c.toString();
        elementsArray.splice(a + 1, 2);
    }
//addition
    function add(a, b) {
        var c = parseInt(elementsArray[a]) + parseInt(elementsArray[b]);
        elementsArray[a] = c.toString();
        elementsArray.splice(a + 1, 2);
    }
//substract
    function substract(a, b) {
        var c = parseInt(elementsArray[a]) - parseInt(elementsArray[b]);
        elementsArray[a] = c.toString();
        elementsArray.splice(a + 1, 2);
    }

//calculating
    function calculate() {
        for (var i = 0; i < elementsArray.length; i++) {
            if (elementsArray[i] == "*") {
                multiply(i - 1, i + 1);
                i = i - 2;
            } else if (elementsArray[i] == "/") {
                divide(i - 1, i + 1);
                i = i - 2;
            }
        };
        for (var i = 0; i < elementsArray.length; i++) {
            if (elementsArray[i] == "+") {
                add(i - 1, i + 1);
                i = i - 2;
            } else if (elementsArray[i] == "-") {
                substract(i - 1, i + 1);
                i = i - 2;
            }
        }
    };

    $('div').click(function() {
        var text = $(this).text();
        switch (text[0]) {
            case "+": {
                equationAdd($scope.numb, "+");
                clearNumber();
                break;
            }
            case "-": {
                equationAdd($scope.numb, "-");
                clearNumber();
                break;
            }

            case "*": {
                equationAdd($scope.numb, "*");
                clearNumber();
                break;
            }
            case "/": {
                equationAdd($scope.numb, "/");
                clearNumber();
                break;
            }
            case "C": {
                clear();
                break;

            }
            case "=": {
                equationAdd($scope.numb, "=");
                elementsArray.pop();
                calculate();
                $scope.numb = elementsArray[0];
                $scope.eqtn = "";
                elementsArray.pop();
                break;
            }
            default: {
                $scope.numb += text[0];
                break;
            }
        }
    });




});