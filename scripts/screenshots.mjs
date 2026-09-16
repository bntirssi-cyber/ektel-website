// Captures review screenshots via headless Chrome + DevTools protocol (no extra dependencies).
// Usage: node scripts/screenshots.mjs [baseUrl]   → .impeccable/review/*.png
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const out = '.impeccable/review';
mkdirSync(out, { recursive: true });

const chromePaths = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];
const chrome = chromePaths.find((p) => existsSync(p));
if (!chrome) throw new Error('No Chrome/Edge found');

const port = 9333;
const proc = spawn(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  `--remote-debugging-port=${port}`, '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function targets() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`);
      return await res.json();
    } catch {
      await sleep(250);
    }
  }
  throw new Error('DevTools not reachable');
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.pending = new Map(); this.events = []; }
  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    const c = new CDP(ws);
    ws.onmessage = (m) => {
      const msg = JSON.parse(m.data);
      if (msg.id && c.pending.has(msg.id)) { c.pending.get(msg.id)(msg); c.pending.delete(msg.id); }
      else c.events.push(msg);
    };
    return c;
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((res, rej) => this.pending.set(id, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result))));
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return r.result.value;
  }
}

async function shot(c, file, { fullPage = false } = {}) {
  let clip;
  if (fullPage) {
    const h = await c.eval('document.documentElement.scrollHeight');
    const w = await c.eval('document.documentElement.clientWidth');
    clip = { x: 0, y: 0, width: w, height: h, scale: 1 };
  }
  const { data } = await c.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: fullPage, ...(clip ? { clip } : {}) });
  writeFileSync(`${out}/${file}`, Buffer.from(data, 'base64'));
  console.log('wrote', file);
}

async function open(c, url, { width, height, mobile }) {
  await c.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: mobile ? 2 : 1, mobile });
  await c.send('Page.navigate', { url });
  await sleep(3500); // fonts, frames and backdrop filters settle
  await c.eval('window.scrollTo(0, 0)');
  await sleep(300);
}

try {
  const list = await targets();
  const page = list.find((t) => t.type === 'page');
  const c = await CDP.connect(page.webSocketDebuggerUrl);
  await c.send('Page.enable');
  await c.send('Runtime.enable');

  const routes = ['/', '/leistungen', '/kontakt', '/impressum', '/datenschutz'];
  for (const route of routes) {
    const slug = route === '/' ? 'home' : route.slice(1);
    await open(c, base + route, { width: 1440, height: 900, mobile: false });
    await shot(c, `desktop-${slug}.png`, { fullPage: true });
    await open(c, base + route, { width: 390, height: 844, mobile: true });
    await shot(c, `mobile-${slug}.png`, { fullPage: true });
  }
  // Required names for the finish reviewer
  await open(c, base + '/', { width: 1440, height: 900, mobile: false });
  await shot(c, 'desktop.png', { fullPage: true });
  await shot(c, 'hero-start.png');
  await c.eval('window.scrollTo(0, (document.querySelector("[data-scroll-phone]").offsetHeight - innerHeight) * 0.5)');
  await sleep(1200);
  await shot(c, 'hero-mid.png');
  await c.eval('window.scrollTo(0, document.querySelector("[data-scroll-phone]").offsetHeight - innerHeight)');
  await sleep(1200);
  await shot(c, 'hero-open.png');
  await open(c, base + '/', { width: 390, height: 844, mobile: true });
  await shot(c, 'mobile.png', { fullPage: true });
  await c.eval('window.scrollTo(0, (document.querySelector("[data-scroll-phone]").offsetHeight - innerHeight) * 0.9)');
  await sleep(1200);
  await shot(c, 'mobile-hero-open.png');
} finally {
  proc.kill();
}
