const noop = x => x;

const computeResponsiveStyle = (prop, value, style, transform = noop) => {
  if (Array.isArray(value)) {
    value.forEach((v, i) => {
      if (v === undefined) return;
      if (i > 0) {
        const breakpoint = `breakpoint-${i - 1}`;
        style[breakpoint] = {
          ...style[breakpoint],
          [prop]: transform(v)
        };
      } else {
        style[prop] = transform(v);
      }
    });
  } else {
    style[prop] = transform(value);
  }
};

const computeResponsiveStyleProps = (props, style, transform) => {
  Object.keys(props).forEach(prop => {
    const value = props[prop];
    computeResponsiveStyle(prop, value, style, transform);
  });
};

const setBorderTryEnsureRhythmViaPadding = (style, borderWidthProps) => {
  Object.keys(borderWidthProps).forEach(borderWidthProp => {
    const borderWidthPropValue = borderWidthProps[borderWidthProp];
    if (typeof borderWidthPropValue !== "number") return;
    style = { ...style, [borderWidthProp]: borderWidthPropValue };
    const paddingProp = borderWidthProp === "borderBottomWidth"
      ? "paddingBottom"
      : borderWidthProp === "borderLeftWidth"
          ? "paddingLeft"
          : borderWidthProp === "borderRightWidth"
              ? "paddingRight"
              : "paddingTop";
    const paddingPropValue = style[paddingProp];
    if (typeof paddingPropValue !== "number") return;
    const compensatedPaddingPropValue = paddingPropValue - borderWidthPropValue;
    const canCompensate = compensatedPaddingPropValue >= 0;
    if (!canCompensate) return;
    style = { ...style, [paddingProp]: compensatedPaddingPropValue };
  });
  return style;
};

const computeStyle = (
  theme,
  {
    display,
    m,
    margin = m,
    my,
    marginVertical = my || margin,
    mx,
    marginHorizontal = mx || margin,
    mt,
    marginTop = mt || marginVertical,
    mb,
    marginBottom = mb || marginVertical,
    ml,
    marginLeft = ml || marginHorizontal,
    mr,
    marginRight = mr || marginHorizontal,
    p,
    padding = p,
    py,
    paddingVertical = py || padding,
    px,
    paddingHorizontal = px || padding,
    pt,
    paddingTop = pt || paddingVertical,
    pb,
    paddingBottom = pb || paddingVertical,
    pl,
    paddingLeft = pl || paddingHorizontal,
    pr,
    paddingRight = pr || paddingHorizontal,
    height,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    width,
    bottom,
    left,
    right,
    top,
    flex,
    backgroundColor,
    color,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderRadius,
    borderBottomLeftRadius = borderRadius,
    borderBottomRightRadius = borderRadius,
    borderTopLeftRadius = borderRadius,
    borderTopRightRadius = borderRadius,
    borderWidth,
    borderBottomWidth = borderWidth,
    borderLeftWidth = borderWidth,
    borderRightWidth = borderWidth,
    borderTopWidth = borderWidth,
    borderStyle,
    alignItems,
    alignSelf,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    opacity,
    overflow,
    position,
    zIndex,
    fontFamily = theme.text.fontFamily,
    size = 0,
    textAlign,
    fontWeight,
    fontSize,
    textDecoration,
    fontStyle,
    lineHeight,
    ...props
  }
) => {
  let style = {};

  const rhythmProps = {
    bottom,
    height,
    left,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    right,
    top,
    width
  };

  const colorProps = {
    backgroundColor,
    borderColor,
    borderBottomColor,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    color
  };

  const valueProps = {
    alignItems,
    alignSelf,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
    flex,
    flexBasis,
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    justifyContent,
    opacity,
    overflow,
    position,
    display,
    zIndex,
    textDecoration,
    textAlign,
    fontFamily,
    fontWeight,
    fontStyle,
    fontSize,
    lineHeight
  };

  const computeColor = value => theme.colors[value] || value;
  const computeRhythm = value =>
    typeof value === "number" ? theme.typography.rhythm(value) : value;
  const computeFontSize = value =>
    typeof value === "number" ? theme.typography.fontSize(value) : value;

  const computeLineHeight = size => {
    const fontSize = theme.typography.fontSize(size);
    const lines = Math.ceil(fontSize / theme.typography.lineHeight);
    const lineHeight = lines * theme.typography.lineHeight;
    return lineHeight + "px";
  };

  computeResponsiveStyleProps(rhythmProps, style, computeRhythm);
  computeResponsiveStyleProps(colorProps, style, computeColor);
  computeResponsiveStyleProps(valueProps, style);

  computeResponsiveStyle("fontSize", size, style, computeFontSize);
  computeResponsiveStyle("lineHeight", size, style, computeLineHeight);

  style = setBorderTryEnsureRhythmViaPadding(style, {
    borderBottomWidth,
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth
  });

  return [style, props];
};

export default computeStyle;
