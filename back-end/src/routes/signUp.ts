import bcrypt from "bcrypt";
import express from "express";
import { Request, Response } from "express";
import warnings from "../constants/warnings";
import db from "../db";

const router = express.Router();

router.post("/", (req: Request, res: Response): void => {
  const { login } = req;
  const { fullName, password, emailOrPhoneNumber, username } = req.body;
  const isEmailField = emailOrPhoneNumber.includes("@");

  bcrypt.hash(password, 10, async (_err: Error, encryptedPwd: string): Promise<void> => {
    const emailRep = "email,";
    const phoneNumberRep = "phone_number,";
    const q = "INSERT INTO users(phone_number, email, full_name, username, password) VALUES($1, $2, $3, $4);"
     .replace(isEmailField ? phoneNumberRep : emailRep, ""); // If an email was provided remove the phone_number field and viceversa

    const values = [
      emailOrPhoneNumber,
      fullName,
      username,
      encryptedPwd
    ];

    try {
      await db.query(q, values);
      if (username) {
        login(username, () => res.redirect("/myfeed"));
      } else {
        login(emailOrPhoneNumber, () => res.redirect("/myfeed"));
      }
    } catch (err) {
      const warn = warnings.ACCOUNT_EXIST(err.detail);
      res.send(warn);
    }
  });
});

export default router;
