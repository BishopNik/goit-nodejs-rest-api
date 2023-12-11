/** @format */

const express = require('express');

const { validateBody, authenticate, upload } = require('../../middlewares');
const {
	registerSchema,
	loginSchema,
	verifyEmailSchema,
	deleteUserSchema,
	changeNameSchema,
	changePasswordSchema,
} = require('../../models');
const {
	register,
	login,
	logout,
	getCurrent,
	changeAvatar,
	confirmVerify,
	reVerifyUser,
	deleteUser,
	changeName,
	changePassword,
} = require('../../controllers/auth');
const { ctrlWrapper } = require('../../utils');

const authRouter = express.Router();

authRouter.post('/register', validateBody(registerSchema), ctrlWrapper(register));

authRouter.post('/login', validateBody(loginSchema), ctrlWrapper(login));

authRouter.post('/logout', authenticate, ctrlWrapper(logout));

authRouter.post('/delete', validateBody(deleteUserSchema), ctrlWrapper(deleteUser));

authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

authRouter.patch('/avatar', authenticate, upload.single('avatar'), ctrlWrapper(changeAvatar));

authRouter.patch('/name', authenticate, validateBody(changeNameSchema), ctrlWrapper(changeName));

authRouter.patch(
	'/pass',
	authenticate,
	validateBody(changePasswordSchema),
	ctrlWrapper(changePassword)
);

authRouter.get('/verify/:verificationToken', ctrlWrapper(confirmVerify));

authRouter.post(
	'/verify',
	validateBody(verifyEmailSchema, 'Missing required field email'),
	ctrlWrapper(reVerifyUser)
);

module.exports = authRouter;
