const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const ProfileSchema = mongoose.Schema({

    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    MobileNumber: { type: String, unique: true },
    City: { type: String },
    UserName: { type: String, unique: true },
    Password: { type: String }

},
    {
        versionKey: false,
        timestamps: true
    }



)

//encrypt password before save db

ProfileSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) {
        return next();
    }


    //hash password

    const salt = await bcrypt.genSalt(10);

    const hashpassword = await bcrypt.hash(this.Password, salt)

    this.Password = hashpassword;
    next()

})




const ProfileModel = mongoose.model('Profile', ProfileSchema)

module.exports = ProfileModel;