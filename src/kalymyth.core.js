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
	"NO_DESCRIPTION": "You see nothing special about [the noun].",
}

class GameObject {
	constructor (name, description, attributes) {
		this.protectedAttributes = ["name", "description", "contents", "light", "aliases"];
		this.attributes = {
			"name": name,
			"description": description || messageDefaults["NO_DESCRIPTION"],
			"contents": [],
			"light": 0,
			"aliases": [],
		};
		for (a in attributes.keys()) {
			this.attributes[a] = attributes[a];
		}
	}
	attributeExists (attributeName) {
		if (this.attributes.keys().includes(attributeName)) {
			return true;
		}
		return false;
	}
	attributeEquals (key, value) {
		if (this.attributes[key] == value) {
			return true;
		}
	}
	setAttribute (key, value) {
		this.attributes[key] = value;
	}
	getAttribute (key) {
		if (this.attributeExists(key)) {
			return this.attributes[key];
		} else {
			return undefined;
		}
	}
	unlockAttribute (key) {
		this.protectedAttributes.filter(function(word) {
			return (word !== key);
		});
	}
	lockAttribute (key) {
		this.protectedAttributes.append(key);		
	}
}
