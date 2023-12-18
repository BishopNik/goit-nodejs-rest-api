/** @format */

const { encode, decode } = require('base-64');
const { HttpError } = require('../../utils');

const { SECRET_KEY } = process.env;

// Функция для декодирования токена и извлечения идентификатора пользователя
const decodeUserId = (token, secretKey) => {
	try {
		// Разделите токен на части: заголовок, полезную нагрузку и подпись
		const [tokenPayload, signature] = token.split('.');

		// Проверьте подпись токена
		const isSignatureValid =
			signature ===
			encode(new TextEncoder().encode(tokenPayload + secretKey).toString('base64'));

		if (isSignatureValid) {
			// Декодируйте полезную нагрузку из base64
			const decodedPayload = decode(tokenPayload);

			// Преобразуйте декодированную полезную нагрузку в объект
			const payloadObject = JSON.parse(decodedPayload);

			// Проверьте срок действия токена
			if (payloadObject.exp && payloadObject.exp > Math.floor(Date.now() / 1000)) {
				// Верните идентификатор пользователя из токена
				return payloadObject.userId;
			}
		}

		// Если токен недействителен, верните null
		return null;
	} catch (error) {
		// Обработайте ошибки, например, если токен неверного формата
		console.error('Ошибка декодирования токена:', error);
		return null;
	}
};

const authenticateV2 = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ');

	if (!bearer) next(HttpError(401));
	try {
		const userId = decodeUserId(token, SECRET_KEY);

		req.user = { userId };
		next();
	} catch {
		next(HttpError(401, 'Якась хуйня'));
	}
};

module.exports = authenticateV2;
