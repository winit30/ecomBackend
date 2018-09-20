const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    validate: {
      validator: (value) => {
          return validator.isAlpha(value);
      },
      message: "{VALUE} is not a valid name"
    }
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    minlength: 10,
    validate: {
      validator: validator.isNumeric,
      message: "{VALUE} is not a valid number"
    }
  },
  email: {
    type: String,
    unique: true,
    index: true,
    required: true,
    minlength: 6,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8
  },
  tokens: [
    {
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }
  ]
});

UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id' , "name", "email", "phone"]);
};

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';

  var token = jwt.sign({_id:user._id.toHexString(), access}, 'HDksh43k43659cfdkjds453kf').toString();
  user.tokens.push({access, token});

  return user.save().then(()=>{
    return token;
  });
};

UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'HDksh43k43659cfdkjds453kf');
	} catch(e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	})
};

UserSchema.statics.findByCredentials = function(email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject();
    } else {
      return new Promise((resolve, reject)=>{
        bcrypt.compare(password, user.password, (err, res) => {
          if(res){
            resolve(user);
          } else {
            reject();
          }
        });
      });
    }
  });
};

UserSchema.methods.removeToken = function(token) {
	var user = this;

	return user.update({
		$pull: {
			tokens: {token}
		}
	});
}

UserSchema.pre('save', function(next){
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash)=>{
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('EcomUser', UserSchema);

module.exports = {User};
