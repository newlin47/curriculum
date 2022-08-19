const Sequelize = require('sequelize');
const conn = new Sequelize('postgres://localhost/curriculum');

const Author = conn.define('author', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validation: {
			isEmpty: false,
		},
	},
});

const Publisher = conn.define('publisher', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	company_name: {
		type: Sequelize.STRING,
		allowNull: false,
		validation: {
			isEmpty: false,
		},
	},
});

const Book = conn.define('book', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4,
		allowNull: false,
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	synopsis: {
		type: Sequelize.TEXT,
		allowNull: false,
	},
});

Book.belongsTo(Author);
Book.belongsTo(Publisher);
Author.hasMany(Book);
Publisher.hasMany(Book);

module.exports = {
	conn,
	Author,
	Book,
	Publisher,
};
