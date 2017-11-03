var plotTools = {
	function writeParagraph (paragraph) {
		var outputParagraph = document.createElement("p");
		var outputContent = document.createTextNode(paragraph);
		outputParagraph.appendChild(outputContent);
		$("#paragraphs").append(outputParagraph);
	}
}

$( document ).ready(function () {
	$("#gameCommandInput").on('keyup', function (e) {
  		var inputToReturn = $("#gameCommandInput").val();
    		$("#gameCommandInput").val('');
    		plotTools.writeParagraph(inputToReturn);
	});
});
