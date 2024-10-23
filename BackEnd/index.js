const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'sqlite.db',
    dialectOptions: {
      multipleStatements: true
    }
  });


// creates the sets table
sequelize.query(
    `CREATE TABLE sets IF NOT EXISTS(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
    );`
)

// creates the cards table
sequelize.query(
    `CREATE TABLE cards IF NOT EXISTS(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    set_id INTEGER,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    FOREIGN KEY (set_id) REFERENCES set(id)
    );`
)