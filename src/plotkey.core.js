function writeParagraph (text) {
	var paragraph = $("<p></p>");
	paragraph.text(text);
	$("#paragraphs").append(paragraph);
}

function grabInput () {
  	var inputToReturn = $("#gameCommandInput").val();
    	$("#gameCommandInput").val('');
	return inputToReturn;
}

function parse (userInput) {
	userInput = userInput.split(/\s+/g, 1);
	console.log(userInput[0]);
	if (['take', 'drop', 'go', 'see'].includes(userInput[0])) {
		writeParagraph('valid input');
	} else {
		writeParagraph('huh?');
	}
}

$(document).ready(function () {
	$(document).on('keyup', function(e) {
		if (e.keyCode === 13) {
			parse(grabInput());
		}
	});
	
	$(".gameShortcut").on('click', function(e) {
		$("#gameCommandInput").val(e.currentTarget.innerText);
	});
});

var messageDefaults = {
	"TOO_DARK": "It is too dark to make out anything.",
}
