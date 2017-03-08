import { h } from "preact";
import computeStyle from './compute-style';

const Box = ({ as = "div", css, ...props }, { renderer, theme }) => {
  const [style, restProps] = computeStyle(theme, props);
  const className = renderer.renderRule(() => ({
    ...style,
    ...(css && (typeof css === "function" ? css(theme, style) : css))
  }));
  return h(as, {className, ...restProps})
};

export default Box;
