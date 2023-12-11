/** @format */

const { Contact, contactAddSchema } = require('./contact.js');
const {
	User,
	registerSchema,
	loginSchema,
	favoriteSchema,
	verifyEmailSchema,
	deleteUserSchema,
	changeNameSchema,
	changePasswordSchema,
} = require('./user.js');

module.exports = {
	Contact,
	contactAddSchema,
	User,
	registerSchema,
	loginSchema,
	favoriteSchema,
	verifyEmailSchema,
	deleteUserSchema,
	changeNameSchema,
	changePasswordSchema,
};
