import { h, Component } from "preact";

var RULE_TYPE = 1;

function createDOMInterface(renderer, node) {
  return function(change) {
    if (true && change.type === RULE_TYPE && !change.media) {
      try {
        node.sheet.insertRule(
          change.selector + "{" + change.declaration + "}",
          node.sheet.cssRules.length
        );
      } catch (error) {}
    } else {
      node.textContent = renderer.renderToString();
    }
  };
}

function isValidHTMLElement(mountNode) {
  return mountNode && mountNode.nodeType === 1;
}

function render(renderer, mountNode) {
  if (!isValidHTMLElement(mountNode)) {
    throw new Error(
      "You need to specify a valid element node (nodeType = 1) to render into."
    );
  }

  void 0;

  mountNode.setAttribute("data-fela-stylesheet", "");

  var updateNode = createDOMInterface(renderer, mountNode);
  renderer.subscribe(updateNode);

  var css = renderer.renderToString();

  if (mountNode.textContent !== css) {
    mountNode.textContent = css;
  }
}

export class Provider extends Component {
  getChildContext() {
    return {
      renderer: this.props.renderer
    };
  }

  componentDidMount() {
    const { mountNode, renderer } = this.props;
    if (mountNode) {
      render(renderer, mountNode);
    }
  }

  render({ children }) {
    return children[0];
  }
}

export class ThemeProvider extends Component {
  getChildContext() {
    const { merge, theme } = this.props;
    const parentTheme = this.context.theme;
    return {
      theme: merge ? { ...parentTheme, ...theme } : theme
    };
  }

  render({ children }) {
    return children[0];
  }
}

ThemeProvider.defaultProps = { overwrite: false };

export default {
  Provider,
  ThemeProvider
};
