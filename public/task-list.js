
;(function(ng) {

  var taskList = ng.module('task-list', []);

  taskList.factory('TaskFactory', function() {

    return {
      tasks: [{
        name: 'Get some milk!'
      }]
    }

  });

  taskList.directive('taskList', function(TaskFactory) {

    return {

      restrict: 'AE',

      templateUrl: 'tpl/task-list.html',

      scope: {
        config: '='
      },

      link: function($scope) {

        $scope.tasks = TaskFactory.tasks;

      }

    };

  });

}(angular));
