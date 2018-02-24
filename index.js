// A "closer to real-life" app example
// using 3rd party middleware modules
// P.S. MWs calls be refactored in many files

// long stack trace (+clarify from co) if needed
if (process.env.TRACE) {
  require('./libs/trace');
}

const Koa = require('koa');
const config = require('config');
const path = require('path');
const fs = require('fs');

const app = new Koa();

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
handlers.forEach(handler => require('./middlewares/' + handler).init(app));

const mainRouter = require('./routes/index');


app.use(mainRouter.routes());

app.listen(config.get('port'));