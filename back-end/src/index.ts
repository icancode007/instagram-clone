import express from "express";
import db from "./db";

const app = express();
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/root", async (req, res) => {
  try {
    const {rows} = await db.query("SELECT * FROM account;"); // currently just a testing table
    const accounts = rows;

    res.send(accounts);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.log(err.stack);
  }
});

// start the Express server
app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
} );
