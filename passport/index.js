const local = require('./localStrategy');
const {User} = require('../models');

module.exports = (passport) =>{
    local(passport);
}