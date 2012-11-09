
$(function(){

// first enable the bootstrap plugins we need


  $('.dropdown-toggle').dropdown();

  $('.help').popover({'trigger':'hover'});

// let's start with Auto

  $('#status-select').val('Auto').attr('selected', 'selected');



	$('#activate-office365-button').on('click',function(){ 
		$('#office365-forwarding').fadeIn();
		$('.office365-agree').hide();
		$('#activate-office365-button').hide();
		$('#service-status span').text('ON').removeClass('label-important').addClass('label-success');		
		$('#service-details-button').fadeIn();
	});

	$('#service-details-button').on('click', function() {
		$('#service-details').fadeIn();
	});


	$('#show-settings, #change-settings').click(function(){
		$('#settings-container').fadeIn();
	});




  var exchangeStatus = $('#status-select').val();
  $('#service-status').append(exchangeStatus);

  if ($('#status-select').val() === 'Off') {
    $('#exchange-off-warning').fadeIn();
    $('#office365-forwarding, #settings-container').hide();
  }
  if ($('#status-select').val() === 'GAL') {
    $('#exchange-off-warning').hide();
    $('#office365-forwarding').show();
    $('#settings-container').show();
  }

});

function delegatesCtrl($scope) {
  $scope.todos = [
    {text:'kermit@uw.edu', done:true},
    {text:'fozzie@uw.edu', done:false}];

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.remove = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}




function statusCtrl($scope) {
  $scope.statuses = [
    {name:'status1', selected:false},
    {name:'status2', selected:false},
    {name:'status3', selected:true}];
}