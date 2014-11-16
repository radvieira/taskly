
;(function(ng) {

  var taskList = ng.module('task-list', []);

  taskList.provider('Tasks', function() {

    var tasks = [];

    return {

      init: function(newTasks) {
        tasks = newTasks
      },

      $get: function() {
        return {
          tasks: tasks
        }
      }

    }

  });

  taskList.directive('taskList', function(Tasks) {

    return {

      restrict: 'AE',

      templateUrl: 'tpl/task-list.html',

      scope: {
        config: '='
      },

      link: function($scope) {

        $scope.tasks = Tasks.tasks;

      }

    };

  });

}(angular));
