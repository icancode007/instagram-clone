import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import local from "passport-local";
import warnings from "../constants/warnings";
import db from "../db";

const router = express.Router();
// WIP signIn NOT TESTED yet
interface IUser {
  id: string;
  username: string;
  phone_number: string;
  full_name: string;
  password: string;
  created_at: string;
  updated_at: string;
}
// Passport Strategy middleware
passport.use(
  new local.Strategy(async (username, password, done): Promise<void> => {
      const q = isNaN(Number(username))
        ? `SELECT * FROM users WHERE phone_number=$1;`
        : `SELECT * FROM users WHERE username=$1`;
      const value = username;
      const queryResponse = await db.query(q, value);
      const retrievedUser = queryResponse.rows[0];
      if (!retrievedUser) {
         return(done(null, false, {message: warnings.USER_DOES_NOT_EXIST}));
       } else {
         bcrypt.compare(password, retrievedUser.password, (result): void => {
           return result
            ? done(null, retrievedUser)
            : done(null, false, {message: warnings.INCORRECT_PASSWORD});
      });
    }
  })
);

// Searialization/Desirialization middleware
passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: string, done): Promise<void> => {
  const q = `SELECT * FROM users WHERE id=$1`;
  const qValues = userId;
  const user = await db.query(q, qValues);
  const userObj = user.rows[0];
  done(null,  userObj);
});

router.post("/signin", passport.authenticate("local"), (_req: Request, res: Response): void => {
  res.redirect("/home");
});

export default router;
