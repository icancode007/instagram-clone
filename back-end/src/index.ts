import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';

// routes sources
import signIn from './routes/signIn';
import signUp from './routes/signUp';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

// routes usage
app.use('/signIn', signIn);
app.use('/signUp', signUp);

// start the Express server
app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ PORT }` );
  }
);
