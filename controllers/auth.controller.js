const users = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.signup = async (req, res) =>
{
    const {fname, lname, email, password} = req.body;
    
    try {
        if (!fname || !lname || !email || !password) {
            return res.status(400).json({msg: 'Please fill all fields'});
        } else {
            const existingUser = await users.findOne({email});
            if (existingUser) return res.status(400).json({msg: 'E-Mail already exist'});

            const hashedPass = await bcrypt.hash(password, 12);

            const result = users.create({fname, lname, email, password: hashedPass});

            const token = jwt.sign({id: result._id, email: result.email}, 'test', {expiresIn: '10h'});

            res.status(200).json({result, token});
        }
    } catch (error) {
        res.status(500).json({msg: 'Something went wrong', err: error.message});
        console.log(error.message);
    }
}

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        const existingUser = await users.findOne({email});
        
        if (!existingUser) return res.status(404).json({msg: "email doesn't exist"});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(403).json({msg: "incorrect email or password"});
        
        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, 'test', {expiresIn: '10h'});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({msg: 'Something went wrong', err: error.message});
    }
}