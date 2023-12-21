/** @format */

const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError, addUpdateSettings } = require('../utils');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const typeGender = ['other', 'male', 'female', 'business'];

const contactSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		gender: {
			type: String,
			enum: typeGender,
			required: true,
		},
		email: {
			type: String,
			match: emailRegexp,
		},
		phone: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);
contactSchema.pre('findOneAndUpdate', addUpdateSettings);
contactSchema.post('findOneAndUpdate', handleMongooseError);

const contactAddSchema = Joi.object({
	name: Joi.string().required(),
	gender: Joi.string()
		.valid(...typeGender)
		.required(),
	email: Joi.string().pattern(emailRegexp),
	phone: Joi.string().required(),
	favorite: Joi.boolean(),
});

const contactSchemaV2 = new Schema(
	{
		name: {
			type: String,
			required: [true, 'Set name for contact'],
		},
		gender: {
			type: String,
			enum: typeGender,
			required: true,
		},
		email: {
			type: String,
			match: emailRegexp,
		},
		phone: {
			type: String,
			required: true,
		},
		favorite: {
			type: Boolean,
			default: false,
		},
		owner: {
			type: String,
			required: true,
		},
	},
	{ versionKey: false, timestamps: true }
);

contactSchemaV2.post('save', handleMongooseError);

const contactAddSchemaV2 = Joi.object({
	contact: Joi.object({
		name: Joi.string().required(),
		gender: Joi.string()
			.valid(...typeGender)
			.required(),
		email: Joi.string().pattern(emailRegexp),
		phone: Joi.string().required(),
		favorite: Joi.boolean(),
	}),
	owner: Joi.string(),
});

const Contact = model('v1contact', contactSchema);
const ContactV2 = model('v2contact', contactSchemaV2);

module.exports = {
	Contact,
	ContactV2,
	contactAddSchema,
	contactAddSchemaV2,
};
