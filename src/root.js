import { h } from "preact";

import { Provider, ThemeProvider } from "preact-fela";
import configureFela from "./configure-fela";

const getFelaMountNode = () => {
  const node = document.getElementById("stylesheet");
  if (!node) {
    throw new Error("missing stylesheet node for Fela");
  }
  const parent = node.parentNode;
  const nextNode = document.createElement("style");
  nextNode.id = "stylesheet";
  parent.replaceChild(nextNode, node);
  return nextNode;
};

const Root = ({ theme, children }) => {
  const renderer = configureFela(theme);
  return (
    <ThemeProvider theme={theme}>
      <Provider mountNode={getFelaMountNode()} renderer={renderer}>
        {children}
      </Provider>
    </ThemeProvider>
  );
};

export default Root;
