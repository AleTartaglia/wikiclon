const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wiki', { logging: false });
const S = require('sequelize')
class Page extends S.Model { }
Page.init({
  title: {
    type: S.STRING,
    allowNull: false
  },
  urlTitle: {
    type: S.STRING,
    allowNull: false
  },
  content: {
    type: S.TEXT,
    allowNull: false
  },
  status: {
    type: S.ENUM('open', 'closed')
  },
  date: {
    type: S.DATE,
    defaultValue: S.NOW
  },
  route: {
    type: S.VIRTUAL,
    get() {
      return ("/wiki" + this.getDataValue("urlTitle"))
    }
  }
}, { sequelize: db, modelName: 'page' });


//-- User Model
class User extends S.Model { }
User.init({
  name: {
    type: S.STRING,
    allowNull: false
  },
  email: {
    type: S.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
}, { sequelize: db, modelName: 'user' });


//HOOKS
Page.beforeValidate(function (page) {
  if (page.title) {
    return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
  }
})



//--
module.exports = {
  Page: Page,
  User: User,
  db: db
};