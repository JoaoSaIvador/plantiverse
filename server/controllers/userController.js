const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: 'Email already in use!' });
            }

            // Check if password is valid
            if (password.length < 6) {
                return res.status(400).json({ msg: 'Password must be at least 6 characters long!' });
            }

            // Password encryption
            const passwordHash = await bcrypt.hash(password, 10);

            // Save user in MongoDB
            const newUser = new User({
                username: username,
                email: email,
                password: passwordHash
            });
            await newUser.save();

            // Create JWT Tokens
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshtoken = createRefreshToken({ id: newUser._id });

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/users/refreshToken',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accessToken });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ msg: "User does not exist!" });
            }

            // Check if password is valid
            const validate = await bcrypt.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({ msg: "Invalid password!" });
            }

            // Create JWT Tokens
            const accessToken = createAccessToken({ id: user._id });
            const refreshtoken = createRefreshToken({ id: user._id });

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/users/refreshToken',
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7d
            })

            res.json({ accessToken });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    logout: async (req, res) => {
        try {
            // Clear all session cookies
            res.clearCookie('refreshtoken', { path: '/users/refreshToken' });
            return res.json({ msg: "Logged out" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refreshToken: (req, res) => {
        try {
            // Check if there is a refresh token
            const rf_token = req.cookies.refreshtoken;
            if (!rf_token) {
                return res.status(400).json({ msg: "Please Login or Register" });
            }

            // Check if refresh token is valid
            jwt.verify(rf_token, process.env.JWT_REFRESH_SECRET, (err, user) => {
                if (err) {
                    return res.status(400).json({ msg: "Please Login or Register" });
                }

                const accesstoken = createAccessToken({ id: user.id });

                res.json({ user, accesstoken });
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    getUser: async (req, res) => {
        try {
            // Check if user exists
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(400).json({ msg: "User does not exist!" });
            }

            res.json(user);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

const createAccessToken = (user) => {
    return jwt.sign(user, process.env.JWT_ACCESS_SECRET, { expiresIn: "1d" });
}

const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
}

module.exports = userController;