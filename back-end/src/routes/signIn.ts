import bcrypt from 'bcrypt';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import warnings from '../constants/warnings';
import db from '../db';

import { getUserLoginOrSigninMethod, UserBy } from '../helpers';

const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const {username: loginHandle, password} = req.body;
    let q = 'SELECT * FROM users WHERE username = $1;';
    switch (getUserLoginOrSigninMethod(loginHandle)) {
        case UserBy.EMAIL:
            q = q.replace(UserBy.USERNAME, UserBy.EMAIL);
            break;
        case UserBy.PHONE_NUMBER:
            q = q.replace(UserBy.USERNAME, UserBy.PHONE_NUMBER);
            break;
        default:
            break;
    }

    const queryResponse = await db.query(q, [loginHandle]);
    const retrievedUser = queryResponse.rows[0];

    if (!retrievedUser) {
       res.status(401).send( {error: warnings.USER_DOES_NOT_EXIST});
    } else {
        if (bcrypt.compare(password, retrievedUser.password)) {
            const token = jwt.sign(
                {
                    id: retrievedUser.id,
                    username: retrievedUser.username
                }, config.jwtSecret);
            res.json(token);
        } else {
            res.status(401).send({error: warnings.INCORRECT_PASSWORD});
        }
    }
});

export default router;
