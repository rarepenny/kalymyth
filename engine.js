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
  constructor (name, description, contents, ...properties) {
    this.name = name;
    this.description = description;
    this.contents = contents;
    this.property = {};
    for prop in properties.keys() {
      this.property[prop] = properties[prop];
    }
  }
  describe () {
    var outputParagraph = document.createElement('p');
    var outputContent = document.createTextNode(this.description);
    outputParagraph.appendChild(outputContent);
    document.getElementById("paragraphs").appendChild(outputParagraph);
  }
}
