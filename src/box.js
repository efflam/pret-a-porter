import { h } from "preact";
import { combineRules } from "fela";
import computeStyle from "./compute-style";

const wrap = x => typeof x === "function" ? x : () => x;

export default ({ as = "div", css, ...props }, { renderer, theme }) => {
  const [style, restProps] = computeStyle(theme, props);
  return h(as, {
    className: renderer.renderRule(
      combineRules(
        wrap(style),
        css && Array.isArray(css)
          ? combineRules(...css.map(rule => wrap(rule)))
          : wrap(css)
      ),
      theme
    ),
    ...restProps
  });
};
