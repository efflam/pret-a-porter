import webPreset from "fela-preset-web";
import { createRenderer } from "fela";
import namedMediaQuery from "fela-plugin-named-media-query";

const configureFela = theme => {
  const queries = theme.breakpoints.map(x => `(min-width: ${x})`);
  const namedQueries = queries.reduce(
    (namedQueries, query, i) => {
      queries[`breakpoint-${i}`] = `@media ${query}`;
      return queries;
    },
    {}
  );
  const renderer = createRenderer({
    mediaQueryOrder: queries,
    plugins: [namedMediaQuery(namedQueries), ...webPreset]
  });
  return renderer;
};

export default configureFela;
