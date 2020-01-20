import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import logger from 'morgan';

// routes sources
import signIn from './routes/signIn';
import signUp from './routes/signUp';

const app = express();
const port = 8080; // TODO: move this to process.env

app.use(logger('dev'));
app.use(session({ resave: true, saveUninitialized: true, secret: 'lzxjaSFIHhwoeufhgw983roerlijsdfoi' }));
app.use(bodyParser.urlencoded({ extended: false }));

// routes usage
app.use('/signIn', signIn);
app.use('/signUp', signUp);

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
  }
);
