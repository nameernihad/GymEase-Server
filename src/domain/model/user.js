class User {
  constructor(id, name, email, password, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}

module.exports = {
  User,
};
