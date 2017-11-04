function writeParagraph (text, cause="?") {
	var paragraph = $("<p data-cause=\"" + cause + "\"></p>");
	// Data-cause allows the player to view the command which caused the output of this paragraph by mousing over it.
	paragraph.text(text);
	$("#paragraphs").append(paragraph);
}

function grabInput () {
  	var inputToReturn = $("#gameCommandInput").val();
    	$("#gameCommandInput").val('');
	return inputToReturn;
}

function parse (userInput) {
	userInput = userInput.split(/\s+/, 1);
	if (userInput[0] in ['take', 'drop', 'go', 'see']) {
		writeParagraph('valid input', userInput[0]);
	} else {
		writeParagraph('huh?', userInput[0]);
	}
}

$(document).ready(function () {
	$("#gameCommandInput").on('keyup', function(e) {
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
