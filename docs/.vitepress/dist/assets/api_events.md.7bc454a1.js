import { _ as s, c as n, o as a, a as l } from './app.2650a9de.js'
const A = JSON.parse(
    '{"title":"Events","description":"","frontmatter":{},"headers":[{"level":2,"title":"Listening to Events","slug":"listening-to-events","link":"#listening-to-events","children":[]},{"level":2,"title":"All Events","slug":"all-events","link":"#all-events","children":[]}],"relativePath":"api/events.md"}'
  ),
  e = { name: 'api/events.md' },
  t = l(
    `<h1 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h1><p>Events provides more flexibility to intercept image click event</p><h2 id="listening-to-events" tabindex="-1">Listening to Events <a class="header-anchor" href="#listening-to-events" aria-hidden="true">#</a></h2><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">VueLightboxAdvanced</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@clicked:index</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">onClicked</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">defineComponent</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#F07178;">methods</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#F07178;">onClicked</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">v</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Event Emmited....</span><span style="color:#89DDFF;">\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">\`</span><span style="color:#C3E88D;">Return Value: </span><span style="color:#89DDFF;">\${</span><span style="color:#A6ACCD;">v</span><span style="color:#89DDFF;">}\`</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><h2 id="all-events" tabindex="-1">All Events <a class="header-anchor" href="#all-events" aria-hidden="true">#</a></h2><table><thead><tr><th>Event name</th><th>Description</th><th>Arguments</th></tr></thead><tbody><tr><td>clicked:index</td><td>return index or src based on returnSrc prop value</td><td>-</td></tr></tbody></table>`,
    6
  ),
  o = [t]
function p(c, r, i, D, F, y) {
  return a(), n('div', null, o)
}
const C = s(e, [['render', p]])
export { A as __pageData, C as default }
