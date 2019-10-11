import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";
import passport from "passport";
import local from "passport-local";
import warnings from "../constants/warnings";
import db from "../db";
import { getUserLoginOrSigninMethod, UserBy } from "../helpers";

const router = express.Router();

interface IUser {
  id: string;
  email?: string;
  username?: string;
  phone_number?: string;
  full_name: string;
  password: string;
  created_at: string;
  updated_at: string;
}

// Passport Strategy middleware
passport.use(
  new local.Strategy(async (logInHandle, password, done): Promise<void> => {
      let q = "SELECT * FROM users WHERE username='$1';";
      switch (getUserLoginOrSigninMethod(logInHandle)) {
        case UserBy.EMAIL:
          q = q.replace(UserBy.USERNAME, UserBy.EMAIL);
          break;
        case UserBy.PHONE_NUMBER:
          q = q.replace(UserBy.USERNAME, UserBy.PHONE_NUMBER);
          break;
        default:
          break;
      }

      const values = [logInHandle];
      try {
        const queryResponse = await db.query(q, values);
        const retrievedUser = queryResponse.rows[0];
        if (!retrievedUser) {
            return(done(null, false, {message: warnings.USER_DOES_NOT_EXIST}));
         } else {
           console.log("a user got retrieved");
           bcrypt.compare(password, retrievedUser.password, (result): void => {
             return result
              ? done(null, retrievedUser)
              : done(null, false, {message: warnings.INCORRECT_PASSWORD});
        });
      }
    } catch (err) {
      return err;
    }
  })
);

// Searialization/Desirialization middleware
passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId: string, done): Promise<void> => {
  const q = "SELECT * FROM users WHERE id=$1;";
  const values = [userId];
  const user = await db.query(q, values);
  const userObj = user.rows[0];
  done(null,  userObj);
});

router.post("/", passport.authenticate("local"), (_req: Request, res: Response): void => {
  res.redirect("/home");
});

export default router;
