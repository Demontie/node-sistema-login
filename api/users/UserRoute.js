module.exports = function(app) {
    var users = require('UserController');
  
    // Rotas pessoas
    app.route('/pessoas')
      .get(users.get_all_users)
      .post(users.create_user);
  
  
    app.route('/pessoas/:userId')
      .get(users.read_user)
      .put(users.update_user)
      .delete(users.delete_user);
  };
  