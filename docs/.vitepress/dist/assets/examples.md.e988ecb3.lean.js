import {
  _ as c,
  c as F,
  b as n,
  a as s,
  o as D,
  r as a
} from './app.2650a9de.js'
const f = JSON.parse(
    '{"title":"Examples","description":"","frontmatter":{},"headers":[{"level":2,"title":"Basic Example","slug":"basic-example","link":"#basic-example","children":[]},{"level":2,"title":"With Random Shuffle","slug":"with-random-shuffle","link":"#with-random-shuffle","children":[]},{"level":2,"title":"With 3 column","slug":"with-3-column","link":"#with-3-column","children":[]},{"level":2,"title":"With Event","slug":"with-event","link":"#with-event","children":[]},{"level":2,"title":"With SRC","slug":"with-src","link":"#with-src","children":[]}],"relativePath":"examples.md"}'
  ),
  r = { name: 'examples.md' },
  y = s('', 2),
  i = s('', 2),
  C = s('', 2),
  A = s('', 2),
  h = s('', 2),
  d = s('', 1)
function m(_, g, E, u, b, x) {
  const p = a('ExampleBasic'),
    l = a('ExampleRandomShuffle'),
    o = a('ExampleWith3column'),
    e = a('ExampleWithEvent'),
    t = a('ExampleWithSRC')
  return D(), F('div', null, [y, n(p), i, n(l), C, n(o), A, n(e), h, n(t), d])
}
const j = c(r, [['render', m]])
export { f as __pageData, j as default }
