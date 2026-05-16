const User = require("../modals/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const { FirstName, LastName, email, password } = req.body

        if (!FirstName || !LastName || !email || !password) {
            return res.status(400).send({
                message: "Please fill all the fields"
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).send({
                message: "User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)


        const newUser = await User.create({
            FirstName,
            LastName,
            email,
            password: hashPassword
        })

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" })


        return res.status(201).send({
            message: "User created Successfully",
            newUser: {
                token: token,
                id: newUser._id,
                FirstName: newUser.FirstName,
                LastName: newUser.LastName,
                email: newUser.email
            }
        })
    }
    catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        })
        console.error("Auth Error:", error);
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({
                message: "Please fill all the fields"
            })
        }
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(400).send({
                message: "Invalid email or password"
            })
        }
        const isMatch = await bcrypt.compare(password, existingUser.password)
        if (isMatch) {
            const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
            return res.status(200).send({
                message: "Login Successfully!",
                newUser: {
                    token,
                    id: existingUser._id,
                    FirstName: existingUser.FirstName,
                    LastName: existingUser.LastName,
                    email: existingUser.email
                }
            });
        } else {
            return res.status(400).send({
                message: "Invalid email or password"
            })
        }

    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

module.exports = { signup, login }