var app=angular.module("MyApp",[]);
app.controller('TodoCtrl',function TodoCtrl($scope)
{
    $scope.todos = [];
    // adding the elements to the to do list
    $scope.addTodo = function() {
        $scope.todos.push({
            text:$scope.todoText,
            done:false
        });
        $scope.todoText = '';
    };

    // changing the status to pending to done
    $scope.changeToDone = function (event) {
        angular.element(event.target).parent().append("<span class='label success'>Done!</span>");
        angular.element(event.target).parent().attr("class", 'completed');
        angular.element(event.target).remove();
        archive();
    };



// deleting the items from the to do list
    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
});
