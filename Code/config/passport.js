const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user/user');
const config = require('../config/database');

module.exports.configStrategy = function(app, passport){
    let opts = {};

    //Local
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload);
        User.getUserById(jwt_payload._id, (err, user)=>{
            if(err){
                return done(err, false);
            }else if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        });
    }));
}