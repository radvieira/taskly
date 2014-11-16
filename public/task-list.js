
;(function(ng) {

  var taskList = ng.module('task-list', []);

  taskList.provider('Tasks', function() {

    var tasks = [], nowSelected = -1;

    return {

      init: function(newTasks) {
        tasks = newTasks
      },

      $get: function($rootScope) {

        return {

          list: tasks,

          save: function(task) {

            tasks[ nowSelected > -1 ? nowSelected : tasks.length ] = task;
            nowSelected = -1;

          },

          selected: function(index) {
            nowSelected = index;
            $rootScope.$broadcast('task-selected', tasks[nowSelected]);
          }

        }
      }

    }

  });

  taskList.directive('taskList', function(Tasks) {

    return {

      restrict: 'AE',

      templateUrl: 'tpl/task-list.html',

      scope: {},

      link: function($scope) {

        $scope.tasks = Tasks.list;

        $scope.select = function(index) {

          Tasks.selected(index);

        }

      }

    };

  });

}(angular));
