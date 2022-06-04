const jwt = require('jsonwebtoken');
const { User } = require('../resources/user/user.model');
const config = require('../config/config');


const newToken = (user) => {
    return jwt.sign({ id: user.id }, config.secrets.jwt, {
        expiresIn: config.secrets.jwtExp
    })
}

const verifyToken = token =>
    new Promise((resolve, reject) => {
        jwt.verify(token, config.secrets.jwt, (err, payload) => {
            if (err) return reject(err)
            resolve(payload)
        })
    })

const signUp = async (req, res) => {
    console.log(req.body.email);
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: "Please enter email and password" });
    }

    try {
        const alreadyExists = await User.findOne({ email: req.body.email });
        //console.log("email already exiss", alreadyExists);
        if (!alreadyExists) {
            const user = await User.create(req.body);
            const token = newToken(user);
            return res.status(201).send({ action: "created", message: "Sign Up successfull, login with your credentials" });
        } else {
            return res.status(201).send({ message: "email already registerd", payload: alreadyExists });
        }

    } catch (e) {
        return res.status(500).end();
    }
}

const signIn = async (req, res) => {

    const invalid = { message: "Invalid email or password" }

    if (!req.body.email || !req.body.password) {
        return res.status(400).send('Please enter email and password');
    }

    try {
        const user = await User.findOne({ email: req.body.email })
            .select('email password')
            .exec();

        if (!user) {
            return res.status(404).send(invalid)
        }
        const match = await user.checkPassword(req.body.password);

        if (!match) {
            return res.status(404).send(invalid)
        }
        const token = newToken(user);
        return res.status(201).send({ token });
    } catch (e) {
        console.warn(e);
        return res.status(500).end();
    }
}


const secure = async (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer')) {
        return res.status(401).end()
    }

    const token = bearer.split('Bearer ')[1].trim();

    var payload;
    try {
        payload = await verifyToken(token);
    } catch (e) {
        return res.status(401).end();
    }

    const user = await User.findById(payload.id)
        .select('-password')
        .lean()
        .exec();

    if (!user) {
        return res.status(401).end();
    }

    req.user = user;
    next();
}
module.exports = {
    signup: signUp,
    signin: signIn,
    protect: secure
}