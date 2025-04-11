const User = require('../Models/userModel');
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
var jwt = require('jsonwebtoken');

class controller {

    static async SignUp(req, res) {
        const { username, email, password, pnumber } = req.body;
        // console.log(username, email, password, pnumber);
        if (!username || !email || !password || !pnumber) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            });
        }
        const user = await User.findOne({ email });
        // console.log(user);
        if (user) {
            return res.status(400).json({
                msg: "Email already exists"
            })
        }

        const hash = bcrypt.hashSync(password, salt);
        // console.log(hash);

        const newUser = new User({
            username: username,
            email: email,
            password: hash,
            pnumber: pnumber
        });
        // console.log(newUser);
        await newUser.save();
        return res.status(201).json({
            msg: "User created successfully"
        });
    }

    static async Login(req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                msg: "Please fill all the fields"
            })
        }
        const user = await User.findOne({ email });
        // console.log(user);

        if (!user) {
            return res.status(400).json({
                msg: "Email does not exist"
            })
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        // console.log(isMatch);

        if (!isMatch) {
            return res.status(400).json({
                msg: "Invalid password"
            })
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        // console.log(token);
        return res.status(200).json({
            msg: "Login successful",
            token: token,

        })
    }
}

module.exports = controller;