var plotTools = {
	flush: function(max) {
		max = $("#paragraphs").length - max;
		if (max > 0) {
			$("#paragraphs").slice(0, max - 1).remove();
		}
	},
	writeParagraph: function (paragraph) {
		var outputParagraph = document.createElement("p");
		var outputContent = document.createTextNode(paragraph);
		outputParagraph.appendChild(outputContent);
		$("#paragraphs").append(outputParagraph);
		plotTools.flush(7);
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