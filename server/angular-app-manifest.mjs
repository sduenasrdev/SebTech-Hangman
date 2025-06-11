
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/SebTech-Hangman/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/SebTech-Hangman"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 454, hash: '5d54a3072d28d8ddd0b45629370692edaa796f9337fad2d270b8be36c91aa064', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 967, hash: '7061cc8c9f4427b05aebf3ad462a3ea897aacce20d2d4642edf519fd5032fc8c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 14600, hash: '64644244b77a02fdffe3de9dac063353b09221b4e7a21d2587e327233e081363', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
