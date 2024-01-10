const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.getUserById = function(id) {
    return User.findById(id).exec();
};

module.exports.getUserByUsername = function(username){
    const query = {username: username}
    return User.findOne(query).exec();
}

module.exports.addUser = function(newUser) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(newUser.password, salt))
            .then(hash => {
                newUser.password = hash;
                return newUser.save(); 
            })
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
};

module.exports.comparePassword = function(candidatePassword, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
            if (err) {
                reject(err);
            } else {
                resolve(isMatch);
            }
        });
    });
};