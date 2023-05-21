module.exports = (sequelize, Sequelize) => {
  const token = sequelize.define(
    "Tokens", //name table
    {
      token: {
        type: Sequelize.STRING,
      },
      expired: {
        type: Sequelize.DATE,
      },
      payload: {
        type: Sequelize.STRING,
      },
    }, // nama kolom
    {
      paranoid: true,
    } // option
  );
  return token;
};
