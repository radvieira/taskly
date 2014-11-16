
;(function(ng) {

  var taskList = ng.module('task-list');

  taskList.directive('taskList', function(Tasks) {

    return {

      restrict: 'AE',

      templateUrl: 'tpl/task-list.html',

      scope: {},

      link: function($scope) {

        $scope.tasks = Tasks.list;

        $scope.select = function(index) {

          Tasks.selected(index);

        };

        $scope.complete = function(index) {

          Tasks.completed(index);

        };

      }

    };

  });

}(angular));
