
;(function(ng) {

  var taskList = ng.module('task-list');

  taskList.provider('Tasks', function() {

    var tasks = [], nowEditing = -1;

    return {

      init: function (newTasks) {
        tasks = newTasks
      },

      $get: function ($rootScope) {

        return {

          list: tasks,

          save: function (task) {

            tasks[nowEditing > -1 ? nowEditing : tasks.length] = task;
            nowEditing = -1;

          },

          selected: function (index) {

            if (!isNaN(index)) {
              nowEditing = index;
              $rootScope.$broadcast('task-selected', tasks[nowEditing]);
            } else {
              return nowEditing;
            }

          },

          completed: function(index) {

            var task = tasks[index];
            tasks.splice(index, 1);
            nowEditing = -1;
            $rootScope.$broadcast('task-completed', task);

          }

        }
      }

    }

  });

}(angular));
