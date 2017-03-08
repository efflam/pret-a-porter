import { h, Component } from "preact";
import Box from "./box";

export class Grid extends Component {
  getChildContext() {
    return {
      gutter: this.props.gutter
    };
  }

  render() {
    const { gutter, cellStyle, children, ...props } = this.props;
    const mx = Array.isArray(gutter) ? gutter.map(g => (-g) / 2) : (-gutter) / 2;
    return (
      <Box display="flex" flexWrap="wrap" marginHorizontal={mx} {...props}>
        {children}
      </Box>
    );
  }
}

Grid.defaultProps = {
  gutter: 0
};

export class Cell extends Component {
  render({ width = "100%", style, ...props }, state, { gutter, cellStyle }) {
    const px = Array.isArray(gutter) ? gutter.map(g => g / 2) : gutter / 2;
    return (
      <Box
        width={width}
        style={theme => ({
          ...(style && style(theme)),
          ...(cellStyle && cellStyle(theme))
        })}
        {...props}
        paddingHorizontal={px}
      />
    );
  }
}
