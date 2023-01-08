

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ProfileModel = require('../model/ProfileModel')

const asyncHandler = require('express-async-handler')



///// *****************************************registration************************


exports.CreateProfile = asyncHandler(async (req, res) => {


    const { FirstName, LastName, EmailAddress, MobileNumber, City, UserName, Password } = req.body;


    if (!EmailAddress, !UserName, !Password) {

        res.send(400)
        throw new Error("fill out the require fileld")
    }

    const existEmail = await ProfileModel.findOne({ EmailAddress: EmailAddress, Password: Password });

    if (existEmail) {
        res.status(400)
        throw new Error('Already registered')
    }



    const user = ProfileModel.create({

        FirstName,
        LastName,
        EmailAddress,
        MobileNumber,
        City,
        UserName,
        Password

    }

    )


    if (user) {

        const { FirstName, LastName, EmailAddress, MobileNumber, City, UserName, Password } = req.body;


        res.status(201).json({
            FirstName,
            LastName,
            EmailAddress,
            MobileNumber,
            City,
            UserName,
            Password
        })

    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})



////************************************************/ user login***************************



exports.UserLogin = asyncHandler(async (req, res) => {

    let UserName = req.body.UserName
    let Password = req.body.Password

    if (!UserName || !Password) {
        res.status(400);
        throw new Error("Please add UserName and password");
    }

    const user = await ProfileModel.findOne({ UserName: UserName });



    const CorrectPassword = await bcrypt.compare(Password, user.Password);

    if (!user) {
        res.status(400);
        throw new Error("User not found, please signup");
    }



    if (user && CorrectPassword) {

        const payload = {
            data: user

        }


        const token = jwt.sign({ payload }, process.env.JWT_SECRATE, { expiresIn: '7d' });

        res.status(200).json({
            status: "success",
            data: user,
            token: token


        })

    } else {

        res.status(401).json({ status: "fail", "error": error, message: "unauthorize user login" })

    }

})

//***************************** */ get a profile using Username***********************************


exports.UserProfile = asyncHandler(async (req, res) => {

    const UserName = req.headers.username;
    const user = await ProfileModel.find({ UserName: UserName })

    if (user) {

        res.status(200).json({ status: "success", data: user })

    } else {
        res.status(200).json({ Error: "authentication failed" })
    }


})



//**************************************update profile********************************************/

exports.UpdateProfile = asyncHandler(async (req, res) => {

    const UserName = req.headers.username;

    const result = await ProfileModel.updateOne({ UserName: UserName }, { $set: req.body }, { upsert: true })

    if (result) {
        res.status(204).json({ status: "updated", data: result })

    } else {
        res.status(401)
        throw new Error({ 'status': "fail", 'msg': "updated failed" })
    }

})