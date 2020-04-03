import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import warnings from '../constants/warnings';
import db from '../db';

const { ACCOUNT_EXIST } = warnings;

const router = express.Router();

router.post('/', (req: Request, res: Response): void => {
  const { fullName, password, emailOrPhoneNumber, username } = req.body;
  const isEmailField = emailOrPhoneNumber.includes('@');

  bcrypt.hash(password, 10, async (_err: Error, encryptedPwd: string): Promise<void> => {
    const emailRep = 'email,';
    const phoneNumberRep = 'phone_number,';
    const q = 'INSERT INTO users(phone_number, email, full_name, username, password) VALUES($1, $2, $3, $4) RETURNING *;'
     .replace(isEmailField ? phoneNumberRep : emailRep, ''); // If an email was provided remove the phone_number field and vice versa

    const values = [
      emailOrPhoneNumber,
      fullName,
      username,
      encryptedPwd
    ];

    try {
      const result = await db.query(q, values);
      const user = result.rows[0];

      if (!user) {
        res.status(401).json({ error: ACCOUNT_EXIST('username') });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            username: user.username
          }, config.jwtSecret);
        res.json(token);
      }
    } catch (err) {
      res.json({ error: ACCOUNT_EXIST(err.detail) });
    }
  });
});

export default router;
