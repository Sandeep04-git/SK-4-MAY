const express = require('express');

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// Restrict the route surface to ONLY the two canonical endpoints (GET '/' and
// GET '/good-evening') per AAP §0.4.1 / §0.1.3 (A3). Express's default routing is
// case-insensitive and non-strict, which silently exposes path aliases:
//   - 'case sensitive routing': '/Good-Evening' / '/GOOD-EVENING' no longer alias '/good-evening'.
//   - 'strict routing': a trailing slash ('/good-evening/') and a duplicate-slash root ('//')
//     no longer alias their canonical paths.
// Unmatched variants fall through to Express's built-in 404. These are app settings only —
// no routing or error-handling middleware is added (AAP §0.5.2). Must be set before the routes.
app.set('case sensitive routing', true);
app.set('strict routing', true);

app.get('/', (req, res) => res.status(200).type('text/plain').send('Hello, World!\n'));

app.get('/good-evening', (req, res) => res.type('text/plain').send('Good evening'));

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
