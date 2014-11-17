
;(function(ng) {

  var taskList = ng.module('task-list');

  taskList.directive('taskList', function(Tasks) {

    return {

      restrict: 'AE',

      templateUrl: 'task-list/tpl/task-list.html',

      scope: {},

      link: function($scope) {

        $scope.tasks = Tasks.list;

        $scope.select = function(index) {

          Tasks.selected(index);

        };

        $scope.complete = function(index) {

          Tasks.completed(index);

        };

        $scope.isSelected = function(index) {

          return Tasks.selected() === index;

        }

      }

    };

  });

}(angular));
