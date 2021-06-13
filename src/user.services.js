const { getUsers } = require('./functions');

class UserServices {
  get() {
    return getUsers();
  }
}

module.exports = new UserServices();
