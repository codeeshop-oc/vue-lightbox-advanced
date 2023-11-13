import{_ as t,c as s,o as a,a as e}from"./app.10de70a4.js";const D=JSON.parse('{"title":"Configs","description":"","frontmatter":{},"headers":[{"level":2,"title":"All Props","slug":"all-props","link":"#all-props","children":[]},{"level":2,"title":"Passing Setting Props","slug":"passing-setting-props","link":"#passing-setting-props","children":[]}],"relativePath":"configs.md"}'),n={name:"configs.md"},l=e(`<h1 id="configs" tabindex="-1">Configs <a class="header-anchor" href="#configs" aria-hidden="true">#</a></h1><p>Listing all the available props</p><h2 id="all-props" tabindex="-1">All Props <a class="header-anchor" href="#all-props" aria-hidden="true">#</a></h2><p>Check out <a href="https://codeeshop-oc.github.io/vue-lightbox-advanced/" target="_blank" rel="noreferrer">demo examples</a> for settings usage.</p><table><thead><tr><th>Prop name</th><th>Description</th><th>Type</th><th>Values</th><th>Default</th></tr></thead><tbody><tr><td>images</td><td>pass images array</td><td>array</td><td>-</td><td>[]</td></tr><tr><td>shuffle</td><td>enable the shuffling of images</td><td>boolean</td><td>-</td><td>false</td></tr><tr><td>shuffleBy</td><td>choose one type to shuffle the images based upon</td><td>string</td><td>&#39;ASC&#39;, &#39;DESC&#39;, &#39;RANDOM&#39;, &#39;DEFAULT&#39;</td><td>DEFAULT</td></tr><tr><td>returnSrc</td><td>if you want to return src other than index on image click</td><td>Boolean</td><td></td><td>false</td></tr><tr><td>css</td><td>pass the css classes to add in DIV tag</td><td>string</td><td>-</td><td>h-250 h-md-400 h-lg-600</td></tr><tr><td>cells</td><td>pass the css classes to add in DIV tag</td><td>number</td><td>-</td><td>5</td></tr></tbody></table><h2 id="passing-setting-props" tabindex="-1">Passing Setting Props <a class="header-anchor" href="#passing-setting-props" aria-hidden="true">#</a></h2><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">VueLightboxAdvanced</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:items</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">images</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,7),o=[l];function d(r,p,i,c,h,g){return a(),s("div",null,o)}const u=t(n,[["render",d]]);export{D as __pageData,u as default};
