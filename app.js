var myApp = angular.module('myApp', ['testMod']);

angular.module('testMod', []).
  factory('thing', function () {
    return 'hi';
  }).
  factory('otherThing', function (thing, $http) {
    return thing;
  });

// Controllers
// ===========

function TodoCtrl($scope, $http, thing, otherThing) {

  $scope.listName = 'Todo';

  $scope.todos = [
    {text:'learn angular', done:true},
    {text:'build an angular app', done:false}];

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}

function SuperCtrl($scope) {
  $scope.listName = 'Super List';
}

// filters
// =======

myApp.filter('bogosort', function () {

  // check if the array is sorted
  var isSorted = function (ar) {
    var i;
    for (i = 1; i < ar.length; i++) {
      if (ar[i - 1].text > ar[i].text) {
        return false;
      }
    }
    return true;
  };

  var bogosort = function (input) {
    while (!isSorted(input)) {
      input = input.sort(function () {
        return Math.random() - 0.5;
      });
    }
    return input;
  };

  return function (input, option) {
    return bogosort(input);
  };
});

myApp.filter('nativesort', function () {
  return function (input, option) {
    return input.sort();
  };
});
