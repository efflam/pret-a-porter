import ratios from "./ratios";

const typography = ({ fontSize, lineHeightRatio, scaleRatio }) => {
  const lineHeight = fontSize * lineHeightRatio;
  const scaleRatioValue = typeof scaleRatio === "string"
    ? ratios[scaleRatio]
    : scaleRatio;
  const rhythm = x => x * lineHeight;
  const computeFontSize = x =>
    Array.from(Array(Math.abs(x))).reduce(
      size => size * (x > 0 ? scaleRatioValue : 1 / scaleRatioValue),
      fontSize
    );
  const computeLines = x => Math.ceil(x / lineHeight);
  const computeLineHeight = x => rhythm(computeLines(computeFontSize(x)));
  return {
    fontSize: computeFontSize,
    lineHeight: computeLineHeight,
    rhythm: rhythm
  };
};

export default typography;
