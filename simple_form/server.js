import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const directory = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT) || 3000;
const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/src/main.js', ['src/main.js', 'text/javascript; charset=utf-8']],
]);

const server = createServer(async (request, response) => {
  const asset = assets.get(request.url);
  if (request.method !== 'GET' || !asset) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }

  try {
    const contents = await readFile(join(directory, asset[0]));
    response.writeHead(200, { 'Content-Type': asset[1] });
    response.end(contents);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Could not load the app');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Name form is running at http://localhost:${port}`);
});
