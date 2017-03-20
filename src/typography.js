const { abs, ceil } = Math;
import ratios from "./ratios";

const typography = ({ fontSize, lineHeight, ratio, unit = "rem" }) => {
  const ratioValue = typeof ratio === "string" ? ratios[ratio] : ratio;
  const rhythm = x => x * lineHeight;
  const computeFontSize = x =>
    Array.from(Array(abs(x))).reduce(
      size => size * (x > 0 ? ratioValue : 1 / ratioValue),
      fontSize
    );
  const computeLines = x => ceil(x / lineHeight);
  const computeLineHeight = x => rhythm(computeLines(computeFontSize(x)));
  const withUnit = f => x => f(x) + unit;
  return {
    fontSize: withUnit(computeFontSize),
    lineHeight: withUnit(computeLineHeight),
    rhythm: withUnit(rhythm)
  };
};

export default typography;
