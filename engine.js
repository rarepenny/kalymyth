class Parser {
  constructor (grammar) {
    this.grammar = this.compile(grammar);
  }
  compile (grammar) {
    return grammar;
  }
  tokenize (phrase) {
    return phrase;
  }
}

class World {
  constructor (title) {
    this.title = title;
    document.getElementById("title").textContent = this.title;
    this.nodes = [];
  }
  addNode (node) {
    this.nodes.append(node);
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
    for prop in properties.keys() {
      this.property[prop] = properties[prop];
    }
  }
  expectProperty (key, value) {
    if (this.property[key] === value) {
      return true;
    } else {
      return false;
    }
  }
  safeSetProperty (key, value) {
    if !(key in this.property) {
      this.property[key] = value;
    }
  }
  getProperty (key) {
    return this.property[key];
  }
  setProperty (key, value) {
    this.property[key] = value;
  }
  describe (override) {
    var outputParagraph = document.createElement("p");
    if (override) {
      var outputContent = document.createTextNode(override);
    } else {
      var outputContent = document.createTextNode(this.getProperty("description"));
    }
    outputParagraph.appendChild(outputContent);
    document.getElementById("paragraphs").appendChild(outputParagraph);
  }
}
