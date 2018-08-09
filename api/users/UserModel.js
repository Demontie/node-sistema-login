var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UsersSchema = new Schema({   
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone:{
    type:String,
    require:true,
    unique: true
  },    
  profile: {
    firstName: { type: String },
    lastName: { type: String },
    nickName:{ type: String}
  }  
});


// Função para que antes de salvar, fazer o hash da senha(password)
UsersSchema.pre('save', function (next) {
  const user = this,
    SALT_FACTOR = 5;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Metodo para comparar na hora de logar
UsersSchema.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return cb(err); }

    cb(null, isMatch);
  });
};


module.exports = mongoose.model('Users', UsersSchema);