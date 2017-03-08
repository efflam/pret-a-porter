import typography from "./typography";
import defaultColors from "./default-colors";

export const nativeFontFamily = [
  "-apple-system",
  "system-ui",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  "Roboto",
  '"Helvetica Neue"',
  "Arial",
  "sans-serif"
].join(", ");

const breakpoints = ["400px", "800px", "1040px", "1280px"];

const theme = {
  breakpoints: breakpoints,
  typography: typography({
    fontSize: 16,
    fontSizeScale: "step4",
    lineHeight: 24
  }),
  colors: {
    primary: defaultColors.blue,
    success: defaultColors.green,
    warning: defaultColors.orange,
    danger: defaultColors.red,
    ...defaultColors
  },
  states: {
    active: {
      darken: 0.2,
      opacity: 0.7
    },
    disabled: {
      opacity: 0.5
    }
  },
  container: {
    maxWidths: {
      small: 540,
      medium: 720,
      big: 960,
      bigger: 1140
    }
  },
  text: {
    bold: 600,
    fontFamily: nativeFontFamily
  },
  block: {
    marginBottom: 1,
    maxWidth: 21
  },
  button: {
    borderRadius: 99
  },
  heading: {
    fontFamily: nativeFontFamily,
    marginBottom: 1
  },
  paragraph: {
    marginBottom: 1
  }
};

export default theme;
