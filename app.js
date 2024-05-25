/** @format */

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { auth } = require('express-openid-connect');
const { oidcUser } = require('./middlewares');

require('dotenv').config();

const contactsRouter = require('./routes/api/v1/contacts');
const contactsRouterV2 = require('./routes/api/v2/contacts');
const authRouter = require('./routes/api/auth');
const usersRouter = require('./routes/api/users');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

const config = {
	authRequired: false,
	auth0Logout: true,
	baseURL: `${process.env.BASE_URL}/api/auth`,
};

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/auth', auth(config), oidcUser, authRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/users', usersRouter);

app.use('/api/v2/contacts', contactsRouterV2);

app.use((req, res) => {
	res.status(404).json({ message: 'Not found' });
});

app.use((err, _req, res, next) => {
	const { status = 500, message = 'Server error' } = err;
	res.status(status).json({ message });
});

module.exports = app;
