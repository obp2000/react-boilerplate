import { User } from '@prisma/client'
import { InternalServerError, Unauthorized } from 'http-errors'
import { sign, verify } from 'jsonwebtoken'
// import { decode, encode } from 'jwt-simple'

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
                const message = err.name == 'JsonWebTokenError'
                    ? 'Unauthorized'
                    : err.message
                return reject(Unauthorized(message))
            }
            resolve(payload)
        })
    })
}


// export function signAccessToken(payload: User): string | undefined {
//     let token
//     try {
//         token = encode(payload, String(accessTokenSecret))
//     } catch (e) {
//         InternalServerError()
//     }
//     return token
// }

// export function verifyAccessToken(token: string) {
//     let payload
//     try {
//         payload = decode(token, String(accessTokenSecret))
//     } catch (e) {
//         const message = (e as HttpError).name == 'JsonWebTokenError'
//             ? 'Unauthorized'
//             : (e as HttpError).message
//         return Unauthorized(message)
//     }
//     return payload
// }
