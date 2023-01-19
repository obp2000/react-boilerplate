import { User } from '@prisma/client'
import { InternalServerError, Unauthorized } from 'http-errors'
import { sign, verify } from 'jsonwebtoken'
// require('dotenv').config()

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

export function signAccessToken(payload: User): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
        sign({ payload }, String(accessTokenSecret), {}, (err, token) => {
            if (err) {
                reject(InternalServerError())
            }
            resolve(token)
        })
    })
}

export function verifyAccessToken(token: string) {
    return new Promise((resolve, reject) => {
        verify(token, String(accessTokenSecret), (err, payload) => {
            if (err) {
                const message = err.name == 'JsonWebTokenError' ? 'Unauthorized' : err.message
                return reject(Unauthorized(message))
            }
            resolve(payload)
        })
    })
}
