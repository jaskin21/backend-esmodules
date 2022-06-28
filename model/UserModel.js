import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, 'Please tell us your name.'],
    // match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    // index: true,
    max: 255,
  },
  email: {
    unique: true,
    type: String,
    require: [true, 'Please provide email.'],
    lowercase: true,
  },
  password: {
    require: [true, 'Enter your password'],
    type: String,
    min: 8,
    select: false,
  },
});

UserSchema.pre('save', function (next) {
  let user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // generate a salt
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }
      // override the cleartext password with the hashed one
      user.password = hash;
      user.passwordConfirm = undefined;
      next();
    });
  });
});

export default mongoose.model('User', UserSchema);
