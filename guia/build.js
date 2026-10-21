// Monta o guia: lê os capítulos em guia/partes/*.md, converte para HTML,
// injeta trechos reais do código do jogo e gera o PDF com o Edge (ou Chrome) em modo headless.
// Uso: node guia/build.js        (gera guia/guia.html e guia/Guia-de-Programacao-Hispania.pdf)
//      node guia/build.js --html (só o HTML)
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const HERE = __dirname;
const ROOT = path.resolve(HERE, '..');
const OUT_HTML = path.join(HERE, 'guia.html');
const OUT_PDF = path.join(HERE, 'Guia-de-Programacao-Hispania.pdf');

// ---------------------------------------------------------------- utilidades
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------------------------------------------------------------- realce de sintaxe
const JS_KW = 'const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|class|constructor|extends|this|try|catch|finally|throw|typeof|instanceof|of|in|true|false|null|undefined|default|async|await|delete|void';
function highlightJs(code) {
  const re = new RegExp(
    '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                       // 1 comentário
    '|(\'(?:\\\\.|[^\'\\\\\\n])*\'|"(?:\\\\.|[^"\\\\\\n])*"|`(?:\\\\.|[^`\\\\])*`)' + // 2 texto
    '|\\b(\\d+(?:\\.\\d+)?(?:e-?\\d+)?|0x[0-9a-fA-F]+)\\b' +          // 3 número
    '|\\b(' + JS_KW + ')\\b' +                                        // 4 palavra-chave
    '|\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()', 'g');                       // 5 chamada de função
  let out = '', last = 0, m;
  while ((m = re.exec(code))) {
    out += esc(code.slice(last, m.index));
    const cls = m[1] ? 'c' : m[2] ? 's' : m[3] ? 'n' : m[4] ? 'k' : 'f';
    out += `<span class="${cls}">${esc(m[0])}</span>`;
    last = re.lastIndex;
  }
  return out + esc(code.slice(last));
}
function highlightHtml(code) {
  return esc(code)
    .replace(/(&lt;!--[\s\S]*?--&gt;)/g, '<span class="c">$1</span>')
    .replace(/(&lt;\/?)([a-zA-Z0-9-]+)/g, '$1<span class="k">$2</span>')
    .replace(/ ([a-z-]+)=(&quot;|")/g, ' <span class="f">$1</span>=$2')
    .replace(/("[^"\n]*")/g, '<span class="s">$1</span>');
}
function highlightCss(code) {
  return esc(code)
    .replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="c">$1</span>')
    .replace(/([a-z-]+)(\s*:)(?=[^;{}\n]*;)/g, '<span class="f">$1</span>$2')
    .replace(/(#[0-9a-fA-F]{3,8}\b)/g, '<span class="n">$1</span>');
}
function highlightBash(code) {
  return esc(code).replace(/(^|\n)(#[^\n]*)/g, '$1<span class="c">$2</span>').replace(/^(\w[\w.-]*)/gm, '<span class="k">$1</span>');
}
function highlight(code, lang) {
  if (lang === 'js' || lang === 'javascript' || lang === 'json') return highlightJs(code);
  if (lang === 'html') return highlightHtml(code);
  if (lang === 'css') return highlightCss(code);
  if (lang === 'bash' || lang === 'sh') return highlightBash(code);
  return esc(code);
}

// ---------------------------------------------------------------- extração de código real
// Acha a linha que começa com `sig` e devolve o bloco até a chave que fecha,
// ignorando chaves dentro de textos, comentários, regex e template strings.
const fileCache = {};
function readSource(rel) {
  if (!fileCache[rel]) fileCache[rel] = fs.readFileSync(path.join(ROOT, rel), 'utf8').replace(/\r\n/g, '\n');
  return fileCache[rel];
}
function extractBlock(rel, sig) {
  const src = readSource(rel);
  const lines = src.split('\n');
  const li = lines.findIndex(l => l.trimStart().startsWith(sig));
  if (li < 0) throw new Error(`@code: "${sig}" não encontrado em ${rel}`);
  let pos = lines.slice(0, li).join('\n').length + (li ? 1 : 0);
  const start = pos;
  let depth = 0, started = false, prevSig = '(';
  const stack = []; // pilha de contextos: 'tpl' (dentro de template string)
  while (pos < src.length) {
    const ch = src[pos], nx = src[pos + 1];
    const top = stack[stack.length - 1];
    if (top === 'tpl') {
      if (ch === '\\') { pos += 2; continue; }
      if (ch === '`') { stack.pop(); pos++; prevSig = 'x'; continue; }
      if (ch === '$' && nx === '{') { stack.push(depth); depth++; pos += 2; continue; }
      pos++; continue;
    }
    if (ch === '/' && nx === '/') { pos = src.indexOf('\n', pos); if (pos < 0) pos = src.length; continue; }
    if (ch === '/' && nx === '*') { pos = src.indexOf('*/', pos + 2) + 2; continue; }
    if (ch === '\'' || ch === '"') {
      pos++;
      while (pos < src.length && src[pos] !== ch) { if (src[pos] === '\\') pos++; pos++; }
      pos++; prevSig = 'x'; continue;
    }
    if (ch === '`') { stack.push('tpl'); pos++; continue; }
    if (ch === '/' && /[(,=:[!&|?{};+\-*%<>~^]/.test(prevSig)) {
      // literal de expressão regular
      pos++;
      let inClass = false;
      while (pos < src.length) {
        const c = src[pos];
        if (c === '\\') { pos += 2; continue; }
        if (c === '[') inClass = true; else if (c === ']') inClass = false;
        else if (c === '/' && !inClass) break;
        pos++;
      }
      pos++; prevSig = 'x'; continue;
    }
    if (ch === ';' && !started && depth === 0) { pos++; break; } // declaração de uma linha, sem bloco
    if (ch === '{' || ch === '[') { depth++; started = true; }
    else if (ch === '}' || ch === ']') {
      depth--;
      if (typeof top === 'number' && depth === top) { stack.pop(); pos++; continue; } // fim de ${...}
      if (started && depth === 0) { pos++; break; }
    }
    if (!/\s/.test(ch)) prevSig = /[\w$)\]]/.test(ch) ? 'x' : ch;
    pos++;
  }
  const end = pos;
  // completa a linha (ex.: "};" ou "});")
  let lineEnd = src.indexOf('\n', end); if (lineEnd < 0) lineEnd = src.length;
  const text = src.slice(start, lineEnd);
  const firstLine = li + 1, lastLine = firstLine + text.split('\n').length - 1;
  return { text: dedent(text), firstLine, lastLine };
}
function extractLines(rel, a, b) {
  const lines = readSource(rel).split('\n');
  return { text: dedent(lines.slice(a - 1, b).join('\n')), firstLine: a, lastLine: b };
}
function dedent(t) {
  const ls = t.split('\n');
  const ind = Math.min(...ls.filter(l => l.trim()).map(l => l.match(/^ */)[0].length));
  return ls.map(l => l.slice(ind)).join('\n');
}

// ---------------------------------------------------------------- markdown simplificado
const CALLOUTS = {
  dica: '💡 Dica', atencao: '⚠️ Atenção', exercicio: '✍️ Exercício', resposta: '✅ Resposta',
  porque: '❓ Por quê?', nota: '📌 Nota', bug: '🐞 História de um bug', mao: '🛠️ Mão na massa'
};
function inline(s) {
  const codes = [];
  s = s.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return `\u0000${codes.length - 1}\u0000`; });
  s = esc(s)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/ -- /g, ' — ');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${esc(codes[+i])}</code>`);
}

const toc = [];
let h1n = 0, h2n = 0, codeCount = 0;
const extracted = [];

function convert(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '', i = 0;
  const para = [];
  const flush = () => { if (para.length) { html += `<p>${inline(para.join(' '))}</p>\n`; para.length = 0; } };
  while (i < lines.length) {
    const line = lines[i];
    // título de capítulo / seção
    let m;
    if ((m = line.match(/^(#{1,4}) (.*)$/))) {
      flush();
      const lvl = m[1].length;
      let text = m[2], numbered = true;
      if (text.startsWith('! ')) { text = text.slice(2); numbered = false; }
      const id = slug(text) + '-' + toc.length;
      if (lvl === 1) {
        let label = '';
        if (numbered) { h1n++; h2n = 0; label = `Capítulo ${h1n}`; }
        toc.push({ lvl, text, id, label });
        html += `<section class="chapter"><div class="chap-label">${label}</div><h1 id="${id}">${inline(text)}</h1>\n`;
      } else if (lvl === 2) {
        const label = numbered && h1n ? `${h1n}.${++h2n}` : '';
        toc.push({ lvl, text, id, label });
        html += `<h2 id="${id}">${label ? `<span class="num">${label}</span> ` : ''}${inline(text)}</h2>\n`;
      } else html += `<h${lvl}>${inline(text)}</h${lvl}>\n`;
      i++; continue;
    }
    if (line.trim() === '@pagebreak') { flush(); html += '<div class="pagebreak"></div>\n'; i++; continue; }
    // trecho real do código: @code arquivo assinatura   |   @code arquivo 10-20
    if ((m = line.match(/^@code (\S+) (.+)$/))) {
      flush();
      const rel = m[1], arg = m[2].trim();
      const lr = arg.match(/^(\d+)-(\d+)$/);
      const blk = lr ? extractLines(rel, +lr[1], +lr[2]) : extractBlock(rel, arg);
      const lang = rel.endsWith('.css') ? 'css' : rel.endsWith('.html') ? 'html' : 'js';
      codeCount++;
      extracted.push(`${rel} :: ${lr ? arg : arg} → linhas ${blk.firstLine}-${blk.lastLine}`);
      html += `<figure class="code real"><figcaption><span>${esc(rel)}</span><span>linhas ${blk.firstLine}–${blk.lastLine}</span></figcaption><pre><code>${highlight(blk.text, lang)}</code></pre></figure>\n`;
      i++; continue;
    }
    // bloco de código escrito no texto
    if ((m = line.match(/^```(\w*)/))) {
      flush();
      const lang = m[1];
      const buf = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++]);
      i++;
      codeCount++;
      html += `<figure class="code"><pre><code>${highlight(buf.join('\n'), lang)}</code></pre></figure>\n`;
      continue;
    }
    // HTML cru (diagramas)
    if (line.startsWith('<')) {
      flush();
      const buf = [];
      while (i < lines.length && lines[i].trim() !== '') buf.push(lines[i++]);
      html += buf.join('\n') + '\n';
      continue;
    }
    // caixa de destaque: > [tipo] texto
    if ((m = line.match(/^> \[(\w+)\]\s?(.*)$/))) {
      flush();
      const type = m[1];
      const buf = [m[2]];
      i++;
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^>\s?/, ''));
      html += `<aside class="box ${type}"><div class="box-t">${CALLOUTS[type] || type}</div>${convertInner(buf.join('\n'))}</aside>\n`;
      continue;
    }
    // tabela
    if (line.startsWith('|')) {
      flush();
      const rows = [];
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++]);
      const cells = (r) => r.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const head = cells(rows[0]);
      html += '<table><thead><tr>' + head.map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
      for (const r of rows.slice(2)) html += '<tr>' + cells(r).map(c => `<td>${inline(c)}</td>`).join('') + '</tr>';
      html += '</tbody></table>\n';
      continue;
    }
    // listas (com um nível de aninhamento)
    if ((m = line.match(/^(- |\d+\. )/))) {
      flush();
      const ordered = /\d/.test(m[1][0]);
      const items = [];
      while (i < lines.length && (/^(- |\d+\. )/.test(lines[i]) || (/^ {2,}\S/.test(lines[i]) && items.length))) {
        const l = lines[i];
        if (/^(- |\d+\. )/.test(l)) items.push({ text: l.replace(/^(- |\d+\. )/, ''), sub: [] });
        else if (/^ {2,}(- |\d+\. )/.test(l)) items[items.length - 1].sub.push(l.trim().replace(/^(- |\d+\. )/, ''));
        else items[items.length - 1].text += ' ' + l.trim();
        i++;
      }
      const tag = ordered ? 'ol' : 'ul';
      html += `<${tag}>` + items.map(it => `<li>${inline(it.text)}${it.sub.length ? '<ul>' + it.sub.map(s => `<li>${inline(s)}</li>`).join('') + '</ul>' : ''}</li>`).join('') + `</${tag}>\n`;
      continue;
    }
    if (line.trim() === '') { flush(); i++; continue; }
    para.push(line.trim());
    i++;
  }
  flush();
  return html;
}
// conteúdo de caixas: parágrafos, listas e código simples
function convertInner(md) {
  const saveToc = toc.length;
  const out = convert(md);
  toc.length = saveToc;
  return out;
}

// ---------------------------------------------------------------- montagem
const partsDir = path.join(HERE, 'partes');
const files = fs.readdirSync(partsDir).filter(f => f.endsWith('.md')).sort();
let body = '';
for (const f of files) {
  let chunk = convert(fs.readFileSync(path.join(partsDir, f), 'utf8'));
  // fecha a <section> de cada capítulo
  const opens = (chunk.match(/<section class="chapter">/g) || []).length;
  chunk = chunk.replace(/<section class="chapter">/g, (s, off) => (off ? '</section>\n' : '') + s);
  if (opens) chunk += '</section>\n';
  body += chunk;
}

const tocHtml = '<nav class="toc"><h1 id="sumario">Sumário</h1>' + toc.map(t =>
  t.lvl === 1
    ? `<div class="toc1"><a href="#${t.id}">${t.label ? `<span>${t.label}</span>` : ''}${esc(t.text)}</a></div>`
    : `<div class="toc2"><a href="#${t.id}">${t.label ? `<span>${t.label}</span>` : ''}${esc(t.text)}</a></div>`
).join('\n') + '</nav>';

const css = fs.readFileSync(path.join(HERE, 'estilo.css'), 'utf8');
const cover = fs.readFileSync(path.join(HERE, 'capa.html'), 'utf8');
const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>Hispânia — Guia de Programação de Jogos do Zero</title>
<style>${css}</style></head>
<body>
${cover}
${tocHtml}
${body}
</body></html>`;
fs.writeFileSync(OUT_HTML, html);
console.log(`HTML: ${OUT_HTML}`);
console.log(`Capítulos: ${toc.filter(t => t.lvl === 1).length} · Seções: ${toc.filter(t => t.lvl === 2).length} · Blocos de código: ${codeCount}`);
fs.writeFileSync(path.join(HERE, 'trechos-extraidos.txt'), extracted.join('\n'));

if (process.argv.includes('--html')) process.exit(0);

// ---------------------------------------------------------------- PDF
const browsers = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
];
const browser = browsers.find(b => fs.existsSync(b));
if (!browser) { console.error('Nenhum Edge/Chrome encontrado. Abra guia/guia.html no navegador e use Imprimir > Salvar como PDF.'); process.exit(1); }
const url = 'file:///' + OUT_HTML.replace(/\\/g, '/');
execFileSync(browser, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=10000', `--user-data-dir=${path.join(require('os').tmpdir(), 'guia-pdf-profile')}`,
  `--print-to-pdf=${OUT_PDF}`, url], { stdio: 'inherit' });
console.log(`PDF: ${OUT_PDF} (${(fs.statSync(OUT_PDF).size / 1024).toFixed(0)} KB)`);
