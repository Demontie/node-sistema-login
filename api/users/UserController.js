var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.get_all_users = function (req, res) {
    User.find({}, function (erro, users) {
        if (erro)
            res.send(erro);
        res.json(users);
    })
}

exports.create_user = function (req, res) {
    //dado que irá inserir 
    var new_user = new User(req.body);
    new_user.save(function (erro, user) {
        if (erro)
            res.send(erro);
        res.json({ response: true, message: "Usuário cadastrado com sucesso!" });
    });
}


exports.read_user = function (req, res) {
    User.findById(req.params.userId, function (erro, user) {
        if (erro)
            res.send(erro);
        res.json(user);
    });
}

exports.update_user = function(req, res) {
    Pessoa.findOneAndUpdate({_id: req.params.userId}, req.body, {new: true}, function(err, user) {
      if (err)
        res.send(err);
      res.json(user);
    });
  };
    
  exports.delete_auser = function(req, res) {
    Pessoa.remove({
      _id: req.params.userId
    }, function(err, user) {
      if (err)
        res.send(err);
      res.json({ response:true ,message: 'Pessoa deletada com sucesso!' });
    });
  };
