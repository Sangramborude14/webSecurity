app.post('/api/login', async (req,res) => {
    const {username,password} = req.body;

    //Authenticate First
    const user = await verifyUserCredentials(username,password);
    if(!user){
        return res.status(401).json({error: "Invalid Credentials"});
    }

    // Save the guest session info if needed
    const guestCart = req.session.cart;

    //CRITICAL: regenrate sessionID upon authentication to prevent Fixation
    req.session.regenerate((err) => {
        if(err) return res.status(500).json({error: "Session regenrate failed"});

        // Establish new authenticated State
        req.session.userId = user.id;
        req.session.role = user.role;
        if(guestCart) req.session.cart = guestCart;

        // set Hard Expiry Time
        req.session.absoluteExpiresAt = Date.now() + (1000*60*60*24) //1 Day

        req.json({message: "Login successful"});
    })
})