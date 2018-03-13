const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// to do add uniqness and email validation to email feild
const schema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,

    },
    passwordHash: {
        type: String,
        required: true,

    }
}, { timestamps: true });


schema.methods.isPassValid = function(password) {
    return bcrypt.compareSync(password,this.passwordHash)
  };

schema.methods.generateToken = function methodsgenerateToken(){
      return jwt.sign({email:this.email},process.env.SECRET_TOKEN);
  }

schema.methods.authToken = function authToken() {
    return {
        email: this.email,
        token: this.generateToken()
    }
}
module.exports = mongoose.model('User', schema);