const { error } = require("node:console");

function enforceSessionSecurity(req,res, next){
    if(!req.session || !req.session.userId){
        return res.status(401).json({error: "Unauthorized"});
        }

    // 1. Enforce Absolute Timeout
    if(Data.now() > req.session.absoluteExpiresAt){
        return req.session.destroy(() => {
            res.status(401).json({error: "Session expired. Please log in again. "});
        });
    }

    //2. Basic Session Hijacking Guard (Detect abrupt User-Agent Changes)
    const currentUserAgent = req.headers['user-agent'];

    if(!req.session.userAgent){
        req.session.userAgent = currentUserAgent;
    }else if(req.session.userAgent !== currentUserAgent){
        //Device footPrint suddenly changed; terminate the session immediately
        return req.session.destroy(() => {
            res.status(403).json({error: "Session anomly detected. Terminating connection."})
        })
    }
    next();
}

// Logout Cleanup

app.post('api/logout',(req,res) => {
    if(!req.session) return res.sendStatus(200);

    req.session.destroy((err) => {
        if(err) return res.status(500).json({error: "Could not logout"});

        res.clearCookie('__Host-SessionId');
        res.json({message: "Logged out successfully"})
    })
})