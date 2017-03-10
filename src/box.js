import { h } from "preact";
import computeStyle from "./compute-style";
import { combineRules } from "fela";

const wrap = x => typeof x === "function" ? x : () => x;

const Box = ({ as = "div", css, ...props }, { renderer, theme }) => {
  const [style, restProps] = computeStyle(theme, props);
  const cssRule = css && Array.isArray(css)
    ? combineRules(...css.map(rule => wrap(rule)))
    : wrap(css);
  const rule = combineRules(wrap(style), cssRule);
  const className = renderer.renderRule(rule, theme);
  return h(as, { className, ...restProps });
};

export default Box;
