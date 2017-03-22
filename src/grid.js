import { h, Component } from "preact";
import Box from "./box";

const spacing = xs => Array.isArray(xs) ? xs.map(x => -x / 2) : -xs / 2;

class Grid extends Component {
  getChildContext() {
    return {
      px: spacing(this.props.gutter)
    };
  }
  render({ gutter, ...props }) {
    return (
      <Box
        {...props}
        display="flex"
        flexWrap="wrap"
        mx={spacing(this.props.gutter)}
      />
    );
  }
}

Grid.defaultProps = {
  gutter: 0
};

const Cell = (props, { px }) => <Box {...props} px={px} />;

Cell.defaultProps = {
  width: "100%"
};

export { Grid, Cell };
