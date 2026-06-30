const express = require('express');
const session = require('express-session');
const app = express();

//session middleware
app.use(session({
    name: '__Host-SessionId', // Using __Host forces Secure and path=/ at the browser level
    secret: 'your-secret-key', // Used to sign the session Id cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,  // Protects against XSS
        secure: true,    // Protects against MitM: transmits over https only
        sameSite: 'lax', // Protects against CSRF: blocks cross-site subrequest
        path: '/',       // scoped to entire domain
        maxAge: 1000*60*60*24 // Hard expiry time   
    }
}))

// Trust the reverse proxy
// This is Required for cookie security flags to work behind a proxy
app.get('env') === 'production' && app.set('trust proxy',1);

// Setting  a custom secure cookie Maually
app.get('/login',(req,res) => {
    
    res.cookie('theme','dark', {
        httpOnly:true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000*60*60*24*365
    })

    res.send('Logged in successfully! Cookies has been issued')
})

// Reading the cookie safely
app.get('/dashboard',(req,res) => {
    
    if(req.session){
        res.send('Accessing dashboard data');
    }else{
        res.status(401).send('Unauthorized');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Secure server running on port ${PORT}`)
})