var plotTools = {
	function writeParagraph (...content) {
		for paragraph in content {
			var outputParagraph = document.createElement("p");
			var outputContent = document.createTextNode(paragraph);
			outputParagraph.appendChild(outputContent);
			document.getElementById("paragraphs").appendChild(outputParagraph);
		}
	}
  function grabInput () {
  	var inputToReturn = document.getElementById("gameCommandInput").value;
    document.getElementById("gameCommandInput").value = "";
    return inputToReturn;
  }
}

var messageDefaults = {
	"TOO_DARK": "It is too dark to make out anything.",
}

class Parser {
	constructor (grammar) {
		this.grammar = this.compile(grammar);
	}
	compile = function (grammar) {
		return grammar;
	}
	tokenize = function (phrase) {
		return phrase;
	}
}

class World {
	constructor (title) {
		this.title = title;
		document.getElementById("title").textContent = this.title;
		this.nodes = [];
	}
	addNode = function (node) {
		this.nodes.append(node);
	}
	removeNode = function (node) {
		this.nodes.splice(this.nodes.indexOf(node), 1);
	}
}

class Node {
	constructor (name, description="Nothing of interest.", contents=[], ...properties) {
		this.property = {
			"name": name,
			"description": description,
			"light": 0,
			"contents": (contents || []),
			"takeable": true,
			"droppable": true,
			"weight": -1,
			"volume": -1
		};
		this.lockedProperties = ["name", "description", "light", "contents"];
		for prop in properties.keys() {
			this.property[prop] = properties[prop];
		}
	}
	lockProperty = function (key) {
		if !(key in this.lockedProperties) {
			this.lockedProperties.append(key);
		}
	}
	unlockProperty = function (key) {
		if (key in this.lockedProperties) {
			this.lockedProperties.splice(this.lockedProperties.indexOf(key), 1);
		}
	}
	expectProperty = function (key, value) {
		if (this.property[key] === value) {
			return true;
		} else {
			return false;
		}
	}
	safeSetProperty = function (key, value) 
		if (key in this.lockedProperties) {
			throw "Tried to modify a protected property.";
		} else {
			if !(key in this.property) {
				this.property[key] = value;
			}
		}
	}
	getProperty = function (key) {
		return this.property[key];
	}
	setProperty = function (key, value, override=false) {
		if (key in this.lockedProperties && override !== true) {
			throw "Tried to modify a protected property.";
		} else {
			this.property[key] = value;
		}
	}
	describe = function () {
		plotTools.writeParagraph(this.property["description"]);
	}
	listContents = function () {
		var outputParagraph = document.createElement("p");
	}
}

class Room extends Node {
	constructor (name, description="A nondescript room.", contents=[], exits={}, ...properties) {
		super (name, description, contents, properties);
		this.property["exits"] = exits;
		this.property["light"] = 2;
	}
	describe = function () {
		if (this.property["light"] === 0) {
			plotTools.writeParagraph(messageDefaults["TOO_DARK"]);
		} else {
			plotTools.writeParagraph(this.property["name"]);
			plotTools.writeParagraph(this.property["description"]);
		}
	}
}

class Item extends Node {
	constructor (name, alias, description="Nothing of interest.") {
		super (name, description, contents, properties);
		this.property["takeable"] = true;
		this.property["droppable"] = true;
	}
	put = function (container) {
		if (this in container.properties["contents"]) {
			return true
		} else {
			if (container.containedBy(this)) {
				throw "A container cannot contain itself or something containing itself.";
			} else {
				container.properties["contents"].append(this);
				return true;
			}
		}
	}
	containedBy = function (container) {
		for possibility in container.property["contents"] {
			if (possibility === this) {
				return true;
			} else {
				if (possibility.property["contents"] != false && possibility.property["contents"].constructor === Array) {
					if (this.containedBy (possibility)) {
						return true;
					}
				}
			}
		}
		return false;
	}
	containing = function (containee) {
		return containee.containedBy(this);
	}
}
