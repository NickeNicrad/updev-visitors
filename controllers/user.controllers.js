const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const userModel = require('../models/auth.model');

const storage = multer.diskStorage({
    destination: function (req, file, callback)
    {
        
        callback(null, "../uploads/images");
    },

    filename: function(req, file, callback){
        callback(null, Date.now() + file.originalname)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
})

exports.updateUserPassword = async (req, res) =>
{
    const {password, newPass} = req.body;
    const {id} = req.params;
    try
    {
        const currentPass = await userModel.findById(id);
        const isPasswordCorrect = await bcrypt.compare(password, currentPass.password);
        if (isPasswordCorrect === false) return res.status(403).json({msg: "incorrect password"});
        const hashedPass = await bcrypt.hash(newPass, 12)
        const userUpdated =await userModel.findByIdAndUpdate(id, {password: hashedPass});
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(404).json({msg: "user were not found"});
    }
}

exports.updateUser = async (req, res) =>
{
    const {fname, lname, email, phone, address} = req.body;
    const {id} = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg: "no user corresponding to this id"});
        const userUpdated = await userModel.findByIdAndUpdate(id, {fname, lname, email, phone, address});
        res.status(200).json(userUpdated);
    } catch (error) {
        res.status(500).json({msg: 'something went wrong', err: error.message});
    }
}

exports.getMyProfile = async (req, res) =>
{
    const {id} = req.params;
    try {
        const userFound = await userModel.findById(id);
        res.status(200).json(userFound);
    } catch (error) {
        res.status(404).json({msg: 'user not found!'});
    }
}