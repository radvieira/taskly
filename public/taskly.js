
;(function(ng) {

  var taskly = ng.module('taskly', ['task-list']);

  taskly.config(function(TasksProvider) {

    //configure the Task list with a list of tasks
    //this can come from anywhere - async requires manual bootrapping
    TasksProvider.init([{

      name: 'Get some milk!'

    }]);

  });

}(angular));
