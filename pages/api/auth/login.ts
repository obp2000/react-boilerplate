import { login } from '@/services/auth'
import type { HttpError } from 'http-errors'
import { NextApiRequest, NextApiResponse } from 'next'
import { validateLogin } from './validators'
import { compressToEncodedURIComponent } from "lz-string"

export default async function handle(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const data = validateLogin(req)
		try {
			const { accessToken, user } = await login(data)
			const auth = compressToEncodedURIComponent(
				JSON.stringify({ isAuthenticated: true, accessToken }))
			const userComp = compressToEncodedURIComponent(JSON.stringify(user))
			res.setHeader("set-cookie",
				[`auth=${auth}; path=/;`, `user=${userComp}; path=/;`])
			res.status(200).json(undefined)
		}
		catch (e) {
			const { statusCode, message: detail } = e as HttpError
			res.status(statusCode).json({ detail })
		}
	} else {
		throw new Error(
			`The HTTP ${req.method} method is not supported at this route.`
		)
	}
}

    // {
    //   "name": "auth",
    //   "value": "N4IghgxhCmDOsBUD2BraA7EAuE0CeAUgBYBGA4hAJYDylBAkgKoBe9AjAHKX2z3oBKAVggBhegDZ6KAA4ANAGoiCATgB0+AgHcAmrIA2sEgCYAYinoAraQHZ6AWz3mLSAB7URmyhDInmEAMwAJgBuEHYAijTcKACydgCisQAiAOZoCABaYIx2HEkQAAx6ghnyHHqMRgAsmtDy8rKMBWwAyhmM8hYZzIwArvL+engZABIc-nkcvQjxAC7M1PFE6GDo0mSV-F0o8hVJ9JQAMkqwuhwFskYuwRlGer2WSJQxFgCCeDF4BZoxlN8cbHCLjyrhizCQeA4eCqgg4mTAB08YFkHAAZgF5JoMrICGwIEZ5HhLNI7NoAOouZgZFqeQIovRhQSkMmMKIEArY84NcoQCzxI5KOzIgjMQImZS9clsPSPbiUTzkXxiiVSmXOOWeDJkthEMBkzy0AjBbTod4xJKvTThEb8Bn+cKSozKWaIyjItEBfhEDKkmh2DKkMZ6Y4EaQQNjKIjafz8aSBOys6gCPCBFm8OxewJkeSosB2ZTSEh2eROJ4vM1fH5-TQAoEglxgiFQmFwrJ8ArpvREQJicQxBDRuEBagIeiaagjAqqFqyACOJfCVSIZLA8XQgWkZPCs4smmkAH0kvEAEL+V4EDjaFr+Eh6GIEXq1KrhAAcyBAABoQJRYK9erMiAwWYvDAWZoECbBZgAJ16aAAF8gA",
    //   "domain": "localhost",
    //   "path": "/ru",
    //   "expires": -1
    // }