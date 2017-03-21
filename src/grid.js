import { h, Component } from "preact";
import Box from "./box";

class Grid extends Component {
  getChildContext() {
    return {
      gutter: this.props.gutter
    };
  }
  render({ gutter, ...props }) {
    return (
      <Box
        display="flex"
        flexWrap="wrap"
        mx={Array.isArray(gutter) ? gutter.map(g => -g / 2) : -gutter / 2}
        {...props}
      />
    );
  }
}

Grid.defaultProps = {
  gutter: 0
};

const Cell = (props, { gutter }) => (
  <Box
    {...props}
    px={Array.isArray(gutter) ? gutter.map(g => g / 2) : gutter / 2}
  />
);

Cell.defaultProps = {
  width: "100%"
};

export { Grid, Cell };
