import fetch from "node-fetch"

const handleOAuthRedirectionRequest = async (req, res) => {
    const { code, state } = req.query

    if (!code || !state) {
        res.status(403).json({ error: "Authentication failed" })
        return
    }

    const token = await getAccessToken(code)

    res.cookie('token-client', token, {
        maxAge: 3600000,
    });

    res.redirect('/resources')
}

const getAccessToken = async (code) => {
    try {
        const res = await fetch(`http://localhost:3210/token?grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3211/callback&client_id=power-tool&client_secret=ok`, {
            method: 'POST',
        })
        const { token } = await res.json()

        return token
    } catch (e) {
        console.error(e)
    }

    return ''
}

const mustBeAuthenticated = async (req, res, next) => {
    const token = req.cookies['token-client'] || '';

    if (!token) {
        res.redirect('/');
        return;
    }

    req.token = token;

    next();
}

export { handleOAuthRedirectionRequest, mustBeAuthenticated }