const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dontenv').config();

const app = express();
app.use(express.json())
app.use(cookieParser());

// user DB

const USERS = [
    {id: "123",username: "sangram", password: "password123", role: "admin"}
];

// Mock database for active refresh token to manage revocation
let refresehTokensDB = [];


//helper function to genrate token
const genrateAccessToken = (user) => {
    return jwt.sign(
        {userId: user.id, role: user.role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '15m'}
    )
}

const genrateRefreshToken = (user) => {
    return jwt.sign(
        {userId: user.id},
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d'}
    )
};


//LOGIN
app.post('api/login', (req,res) => {
    const { username, password} = req.body;
    const user = USER.find(u => u.username === username && u.password === password);

    if(!user) return res.status(401).json({message: 'Invalid credentials'});

    const accessToken = genrateAccessToken(user);
    const refreshToken = genrateRefreshToken(user);

    // Store refresh token in db
    refresehTokensDB.push(refreshToken);

    // Send refresh Token in a secure, HttpOnly Cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60
    });
    res.json({accessToken,message: 'LoggedIn successfully'})
})

//2. MIDDLEWARE TO VERIFY ACCESS TOKEN
const authenticationToken = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token) return res.status(401).json({message: 'Access Token missing'})
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedPayLoad) => {
        if(err) return res.status(403).json({message: 'Token is expired/invalid'})

        req.user = decodedPayLoad;
        next();
    })
}

//3. PROTECTED ROUTE
app.get('api/dashboard', authenticationToken,(req,res) => {
    res.json({
        message: `Welcome to the secured dashboard`,
        userData: req.user
    })
})

//4. REFRESH TOKEN ROUTE(Get a new access Token)
app.post('/api/refresh', (req,res) => {
    const refresehToken = req.cookies.refresehToken;

    if(!refreshToken) return res.status(401).json({message: 'Refresh token missing'})
    if(!refresehTokensDB.includes(refresehToken)) return res.status(403).json({message: 'Refresh Token revoked or invali'});

    jwt.verify(refresehToken, process.env.REFRESH_TOKEN_SECRET, (err,decoded) => {
        if(err) return res.status(403).json({message: 'Refresh Token expired'});

          //Find user details to sign the new access token
    const user = USERS.find(u => u.id === decoded.userId);
    if(!user) return res.status(403).json({message: 'user no longer exist'})
    
    const newAccessToken = genrateAccessToken(user);
    res.json({ accessToken: newAccessToken})
    })
})  

// 5. LOGOUT ROUTE
app.post('/api/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  // Remove token from database
  refreshTokensDB = refreshTokensDB.filter(token => token !== refreshToken);
  
  // Clear the cookie
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
