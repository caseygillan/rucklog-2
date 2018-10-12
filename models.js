const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  database: 'some_app_name',
  dialect: 'postgres'
});


// Create models here


module.exports = {
  // Export models
  sequelize: sequelize
};
