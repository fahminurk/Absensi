module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    name: Sequelize.STRING,
    address: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    // company_id: Sequelize.INTEGER,
  });
  return User;
};
