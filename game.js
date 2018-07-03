$(document).ready(function () {
	// entire javascript goes here
	
	// global variables
	$('#image').css('display', 'none');
	// timer variables
	var timerNumber = 20;

	// score variables
	var numCorrect = 0;
	var numIncorrect = 0;
	var numAnswered = 0;

	// question and answer variables
	var answers = [];
	var currentQuestion = 0;



	// question object array
	var trivia = [
		q1 = {
			question: 'What is part of a database that holds only one type of information?',
			correct: 1,
			multChoice: ['Report', 'Field', 'Record', 'File'],
			image:"assets/images/timg1.png"
			
		},
		q2 = {
			question: 'OS computer abbreviation usually means ?',
			correct: 2,
			multChoice: ['Order of Significance', 'Open Software', 'Operating System', 'Optical Sensor'],
			image:"assets/images/timg2.png"

		},
		q3 = {
			question: 'Which is a type of Electrically-Erasable Programmable Read-Only Memory?',
			correct: 0,
			multChoice: ['Flash', 'Flange', 'Fury', 'FRAM'],
			image:"assets/images/timg3.png"

		},
		q4 = {
			question: '.MPG extension refers usually to what kind of file?',
			correct: 2,
			multChoice: ['WordPerfect Document file', '	MS Office document', 'Animation/movie file', 'Image file'],
			image:"assets/images/timg4.png"

		},
		q5 = {
			question: 'Who is largely responsible for breaking the German Enigma codes, created a test that provided a foundation for artificial intelligence?',
			correct: 0,
			multChoice: ['Alan Turing', 'Jeff Bezos', 'George Boole', 'Charles Babbage'],
			image:"assets/images/timg7.png"

		},
		q6 = {
			question: 'Who developed Yahoo?',
			correct: 1,
			multChoice: ['Dennis Ritchie & Ken Thompson', 'David Filo & Jerry Yang', 'Vint Cerf & Robert Kahn', 'Steve Case & Jeff Bezos'],
			image:"assets/images/yahoo.png"

		},
		q7 = {
			question: 'The most common format for a home video recorder is VHS. VHS stands for...?',
			correct: 0,
			multChoice: ['Video Home System', 'Very high speed', 'Video horizontal standard', 'Voltage house standard'],
			image:"assets/images/timg5.png"

		},
		q8 = {
			question: 'DB computer abbreviation usually means ?',
			correct: 0,
			multChoice: ['	Database', '	Double Byte', 'Data Block', 'Driver Boot'],
			image:"assets/images/timg6.png"

		}
	];

	// helper functions
	//  helper function to hide html elements
	var hide = function (elementId) {
		$(elementId).css("visibility", "hidden");
	};
	// helper function to show html elements
	var show = function (elementId) {
		$(elementId).css("visibility", "visible");
	};
	// helper function for writing html elements
	var write = function (elementId, thing) {
		$(elementId).html('<h3>' + thing + "</h3>")
	};

	// write question function
	var questionWrite = function () {
		if (currentQuestion <= 7) { 
			$('#questionDiv').html('<h2>' + trivia[currentQuestion].question + '</h2>');
			answers = trivia[currentQuestion].multChoice;
			show('.answer');
			for (var i = 0; i < answers.length; i++) {
				$('#answer' + i).html('<h3>' + answers[i] + '</h3>');
			}
		}
		else {
			gameOver();
		}
	};

	// clears the html contents of the answers
	var answerClear = function () {
		// $('#answersDiv').empty();
		for (var i = 0; i < 4; i++) {
			$('#answer' + i).html('');
		}
		hide('.answer');
	};

	// Timer
	// Timer run function
	var start = function() {
		// starts timer counter
		counter = setInterval(countDown, 1000);

		// clear startTitle
		$('#startTitle').empty();

		// hide start button
		hide('#start');

		//write question & answers
		questionWrite();	
	};

	// clears all content
	var clearScreen = function () {
		$('#startTitle').empty();
		$('#questionDiv').empty();
		$('#scoreDiv').empty();
		answerClear();
	}

	// Timer countdown function
	var countDown = function () {
		// decrement timerNumber
		timerNumber --;
		// write timer to html timerDiv
		$('#timerDiv').html('<h2> Time Remaining: ' + timerNumber + '</h2>');

		// when timer reaches 0
		if (timerNumber == 0) {
			gameOver();
		}
	};

	// Timer stop function
	var stop = function () {
		clearInterval(counter);
	};

	// reset function
	var reset = function () {
		stop();
		timerNumber = 20;
		answers = [];
		currentQuestion = 0;
		clearScreen();
		$('#timerDiv').empty();
		write('#startTitle', 'Click Start Button to Begin!');
		show('#start');
		hide('#reset');
	};
	
	var gameOver = function() {
		// stop the timer
		stop();

		// clear the question and answers
		clearScreen();

		// interact with game over
		write('#startTitle', '<h3>Game Over!</h3>');
		$('#scoreDiv').append('<h3>Here are your results</h3>');
		$('#scoreDiv').append('<h3>Total Questions Answered: ' + numAnswered + '</h3>');
		$('#scoreDiv').append('<h3>Number of correct answers: ' + numCorrect + '</h3>');
		$('#scoreDiv').append('<h3>Number of incorrect answers: ' + numIncorrect + '</h3>');
		show('#reset');
	};

	//next question function
	var nextQuestion = function () {
		$('#image').css('display', 'none');
		$('#questionDiv').css('display', 'initial');
		$('#answersDiv').css('display', 'initial');
		$('#answerMsg').css('display', 'none');
		timerNumber = 20;
		clearInterval();
	}

	//check answer
	$('.answer').click(function () {
		var clicked = $(this);
		var value = clicked.attr('value');
		var correctAnswer = trivia[currentQuestion].correct;

		if (value == correctAnswer) {
			$('#questionDiv').empty();
			answerClear();
			$('#answersDiv').css('display', 'none');
			$('#questionDiv').css('display', 'none');
			$('#answerMsg').css('display', 'initial');
			$('#image').attr('src', trivia[currentQuestion].image);
			$('#image').css('display', 'initial');
			$('#answerMsg').html('<h3> You chose ' + answers[value] + '.</h3> <br><h3> congratulation correct answer is ' + answers[correctAnswer] + '.</h3>');
			setInterval(nextQuestion, 3 * 1000);
			numAnswered ++;
			numCorrect ++;
			currentQuestion ++;
			questionWrite();
		}
		else {
			numAnswered ++;
			numIncorrect ++;
			currentQuestion ++;
			timerNumber = 20;
			$('#questionDiv').empty();
			answerClear();
			questionWrite();
		}
	});

	 // click handlers	
	$('#start').on("click", start);
	$('#reset').on('click', reset);
})