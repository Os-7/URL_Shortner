const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
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
});

// Create the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;

// Function to get a user by ID
module.exports.getUserById = function(id) {
    return User.findById(id).exec();
};

// Function to get a user by username
module.exports.getUserByUsername = function(username){
    const query = {username: username}
    return User.findOne(query).exec();
};

// Function to add a new user with hashed password
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

// Function to compare entered password with hashed password
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
