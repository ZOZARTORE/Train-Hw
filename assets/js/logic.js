// Initialize Firebase
  var config = {
    apiKey: "AIzaSyArPujbuUT5dnIIg5O4OAR19VsjSy5s9cs",
    authDomain: "train-hw-2fdc1.firebaseapp.com",
    databaseURL: "https://train-hw-2fdc1.firebaseio.com",
    projectId: "train-hw-2fdc1",
    storageBucket: "train-hw-2fdc1.appspot.com",
    messagingSenderId: "1043013324341"
  };
  firebase.initializeApp(config);
  // instantiate variables
  var userName;
  var destination;
  var startTime;
  var frequency;
  var next;
  var today = new Date();
  var database = firebase.database();
  //when submit is clicked
  $(".submitBtn").on("click", function(event) {
  	event.preventDefault();
  	//set variables to inputs
  	userName = $("#nameInput").val().trim();
  	destination = $("#destinationInput").val().trim();
    frequency = $("#frequencyInput").val().trim();
  	// change date to array divided into day month and year

  	startTime = $("#startInput").val().trim().split("/");
  	//push values to database
  	database.ref().push({
    name: userName,
    destination: destination,
    start: startTime,
    frequency: frequency,
  });
  	
 	});
  // when new child is detected on database
  database.ref().on("child_added", function(snapshot) {
  	// set current month and year
  	next = (parseInt(Date.parse(today) - Date.parse(snapshot.val().start))/60000) % snapshot.val().frequency;
  	var a = $("<tr>"+"<td>"+snapshot.val().name+"</td>"+"<td>"+snapshot.val().destination+"</td>"+"<td>"+snapshot.val().start+"</td>"+
  		"<td>"+frequency+"</td>"+"<td>"+snapshot.val().next+" minutes"+"</td>"+"</tr>");
  	$(".trainData").append(a);
  });
