const { createServer } = require('https');
const http = require('http');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const { default: consola } = require('consola');

// Check if -dev flag is passed
const isDev = process.argv.includes('--dev');
const dev = isDev;

const app = next({ dev });
const handle = app.getRequestHandler();

consola.log(`Running in ${dev ? 'development' : 'production'} mode`);

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, 'cert', 'fff.albin-url.my.id-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert', 'fff.albin-url.my.id-crt.pem')),
  ca: fs.readFileSync(path.join(__dirname, 'cert', 'fff.albin-url.my.id-chain-only.pem'))
};

app.prepare().then(() => {

  const HTTPS_PORT = dev ? 3000 : 443;
  const HTTP_PORT = dev ? 3001 : 80;

  // HTTPS server (main app)
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(HTTPS_PORT, (err) => {
    if (err) throw err;
    console.log(`> HTTPS Ready on https://localhost:${HTTPS_PORT}`);
  });

  // HTTP server (redirect to HTTPS)
  http.createServer((req, res) => {
    const host = req.headers['host'] || '';
    const redirectURL = `https://${host}${req.url}`;
    
    res.writeHead(301, { Location: redirectURL });
    res.end();
  }).listen(HTTP_PORT, (err) => {
    if (err) throw err;
    console.log(`> HTTP Redirect running on http://localhost:${HTTP_PORT}`);
  });

});
