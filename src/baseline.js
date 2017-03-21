import { h } from "preact";

export default ({ color = "#666", opacity = 0.2, ratio = 1 }, { theme }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(${color} 1px, transparent 1px)`,
        backgroundSize: `auto ${theme.typography.rhythm(ratio)}px`,
        marginTop: -1,
        pointerEvents: "none",
        position: "absolute",
        right: 0,
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 9999,
        opacity: opacity
      }}
    />
  );
};
