const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const crypto = require('crypto');
const { error } = require('console');

const app = express();

//1. secure redis connection
const redisClient = createClient({url: process.env.REDIS_URL});
redisClient.connect().catch(console.error);

app.use(express.json());

//2. Configure session middleware
app.use(session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET || crypto.randomBytes(64).toString('hex'),
    name: '__Host-SessionId',

    resave: false, // dont save session if no change

    saveUninitialized: false, // dont create session for unauthenticated users

    rolling: true, // Reset idle timeout timer on every request

    cookie: {
        httpOnly: true, // CRITICAL: Prevents XSS scripts from reading the cookies
        secure: true,  // CRITITCAL: ensures the cookie is transmitted over HTTPS
        sameSite: 'lax', //CRITITCAL: Protection against CSRF(Cross-site Request Forgery)
        maxAge: 1000 * 60 * 30
    }
}))