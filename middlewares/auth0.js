/** @format */

function oidcUser(req, res, next) {
	res.locals.user = req.oidc?.user;
	next();
}

module.exports = oidcUser;
