import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import warnings from '../constants/warnings';
import db from '../db';

import { getUserLoginOrSigninMethod, UserBy } from '../helpers';

const { USERNAME, EMAIL, PHONE_NUMBER } = UserBy;
const { INCORRECT_PASSWORD, USER_DOES_NOT_EXIST } = warnings;

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const {username: loginHandle, password} = req.body;
    let q = 'SELECT * FROM users WHERE username = $1;';
    switch (getUserLoginOrSigninMethod(loginHandle)) {
        case EMAIL:
            q = q.replace(USERNAME, EMAIL);
            break;
        case PHONE_NUMBER:
            q = q.replace(USERNAME, PHONE_NUMBER);
            break;
        default:
            break;
    }

    const queryResponse = await db.query(q, [loginHandle]);
    const retrievedUser = queryResponse.rows[0];
    if (!retrievedUser) {
       res.status(401).send( {error: USER_DOES_NOT_EXIST});
    } else {
        if (await bcrypt.compare(password, retrievedUser.password)) {
            const token = jwt.sign(
                {
                    id: retrievedUser.id,
                    username: retrievedUser.username
                }, config.jwtSecret);
            res.json(token);
        } else {
           await res.status(401).json({ error: INCORRECT_PASSWORD });
        }
    }
});

export default router;
