/** @format */

const express = require('express');
const { requiresAuth } = require('express-openid-connect');

const { validateBody, authenticate, upload, isEmptyBody, isValidId } = require('../../middlewares');
const {
	registerSchema,
	loginSchema,
	verifyEmailSchema,
	changeNameSchema,
	changePasswordSchema,
	repairPasswordSchema,
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
	repairPasswordLink,
	repairPassword,
	socialLogin,
} = require('../../controllers/auth');
const { ctrlWrapper } = require('../../utils');

const authRouter = express.Router();

// Social
authRouter.get('/', requiresAuth(), ctrlWrapper(socialLogin));

// Регистрация
authRouter.post('/register', isEmptyBody, validateBody(registerSchema), ctrlWrapper(register));

// // Логин
authRouter.post('/login', isEmptyBody, validateBody(loginSchema), ctrlWrapper(login));

// Логаут
authRouter.post('/logout', authenticate, ctrlWrapper(logout));

// Удаление юзера
authRouter.delete('/:userId', isValidId, ctrlWrapper(deleteUser));

// Рефреш приложения
authRouter.get('/current', authenticate, ctrlWrapper(getCurrent));

// Изменение аватар
authRouter.patch(
	'/avatar',
	isEmptyBody,
	authenticate,
	upload.single('avatar'),
	ctrlWrapper(changeAvatar)
);

// Изменение имени
authRouter.patch(
	'/name',
	isEmptyBody,
	authenticate,
	validateBody(changeNameSchema),
	ctrlWrapper(changeName)
);

// Изменение пароля
authRouter.patch(
	'/pass',
	isEmptyBody,
	authenticate,
	validateBody(changePasswordSchema),
	ctrlWrapper(changePassword)
);

// Получение линка на восстановление пароля
authRouter.get('/repair/:id', ctrlWrapper(repairPasswordLink));

// Востановление пароля
authRouter.patch(
	'/repair',
	isEmptyBody,
	validateBody(repairPasswordSchema),
	ctrlWrapper(repairPassword)
);

// Потверждение почты юзера
authRouter.get('/verify/:verificationToken', ctrlWrapper(confirmVerify));

// Повторной запрос потверждения почты
authRouter.post(
	'/verify',
	isEmptyBody,
	validateBody(verifyEmailSchema, 'Missing required field email'),
	ctrlWrapper(reVerifyUser)
);

module.exports = authRouter;
