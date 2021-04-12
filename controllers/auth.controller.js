const users = require('../models/auth.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) =>{
    const {email, password} = req.body;

    try {
        const existingUser = await users.findOne({email});
        
        if (!existingUser) return res.status(404).json({msg: "email doesn't exist"});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(403).json({msg: "incorrect email or password"});
        
        const token = jwt.sign({id: existingUser._id, email: existingUser.email}, 'test', {expiresIn: '10h'});

        res.status(200).json({existingUser, webtoken: token});
    } catch (error) {
        res.status(500).json({msg: 'Something went wrong', err: error.message});
    }
}
