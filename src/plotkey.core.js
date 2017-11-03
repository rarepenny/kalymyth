var plotTools = {
	writeParagraph: function (text, cause="?") {
		var paragraph = $("<p data-cause=\"" + cause + "\"></p>");
		// Data-cause allows the player to view the command which caused the output of this paragraph by mousing over it.
		paragraph.text(text);
		$("#paragraphs").append(paragraph);
	},
	grabInput: function () {
  		var inputToReturn = $("#gameCommandInput").val();
    		$("#gameCommandInput").val('');
    		return inputToReturn;
	}
}

$(document).ready(function () {
	$("#gameCommandInput").on('keyup', function(e) {
		if (e.keyCode === 13) {
			plotTools.writeParagraph(plotTools.grabInput());
		}
	});
});

var messageDefaults = {
	"TOO_DARK": "It is too dark to make out anything.",
}
