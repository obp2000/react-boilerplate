import type { UserObject as User } from '@/interfaces/users'
import { SignJWT, jwtVerify } from 'jose'

export async function signAccessToken(
    payload: User,
    accessTokenSecret: string
): Promise<string> {
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60; // one hour
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(accessTokenSecret))
}

export async function verifyAccessToken(
    token: string,
    accessTokenSecret: string
): Promise<User> {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(accessTokenSecret))
    // run some checks on the returned payload, perhaps you expect some specific values
    // if its all good, return it, or perhaps just return a boolean
    console.log({ payload })
    return payload as User
}


// export function signAccessToken22(payload: User): Promise<string | undefined> {
//     return new Promise((resolve, reject) => {
//         sign({ payload }, String(accessTokenSecret), {}, (err, token) => {
//             if (err) {
//                 reject(InternalServerError())
//             }
//             resolve(token)
//         })
//     })
// }

// export function verifyAccessToken(token: string) {
//     return new Promise((resolve, reject) => {
//         verify(token, String(accessTokenSecret), (err, payload) => {
//             if (err) {
//                 const message = err.name == 'JsonWebTokenError'
//                     ? 'Unauthorized'
//                     : err.message
//                 return reject(Unauthorized(message))
//             }
//             resolve(payload)
//         })
//     })
// }


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
