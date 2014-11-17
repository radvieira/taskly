
;(function(ng) {

  var taskList = ng.module('task-list');

  taskList.provider('Tasks', function() {

    var tasks = [], nowSelected = -1;

    return {

      init: function (newTasks) {
        tasks = newTasks
      },

      $get: function ($rootScope) {

        return {

          list: tasks,

          save: function (task) {

            tasks[nowSelected > -1 ? nowSelected : tasks.length] = task;
            nowSelected = -1;

          },

          selected: function (index) {

            if (!isNaN(index)) {
              nowSelected = index;
              $rootScope.$broadcast('task-selected', tasks[nowSelected]);
            } else {
              return nowSelected;
            }

          },

          completed: function(index) {

            var task = tasks[index];
            tasks.splice(index, 1);
            nowSelected = -1;
            $rootScope.$broadcast('task-completed', task);

          }

        }
      }

    }

  });

}(angular));
