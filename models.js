const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost:5432/rucklog_db', {
  dialect: 'postgres'
});

const User = sequelize.define('user', {
  firstName: Sequelize.TEXT,
  lastName: Sequelize.TEXT,
  email: Sequelize.TEXT,
  passwordDigest: Sequelize.TEXT
});

const Activity = sequelize.define('activity', {
  date: Sequelize.DATEONLY,
  distance: Sequelize.INTEGER,
  hour: Sequelize.INTEGER,
  minute: Sequelize.INTEGER,
  second: Sequelize.INTEGER,
  ruckWeight: Sequelize.INTEGER,
  powerScore: Sequelize.INTEGER
});

User.hasMany(Activity);
Activity.belongsTo(User);

module.exports = {
  User,
  Activity,
  sequelize: sequelize
};
