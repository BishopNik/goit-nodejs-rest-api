/** @format */

const login = require('./login.js');
const register = require('./register.js');
const logout = require('./logout.js');
const getCurrent = require('./getcurrent.js');
const { changeAvatar } = require('./changeavatar.js');
const reVerifyUser = require('./reverifyuser.js');
const confirmVerify = require('./confirmverify.js');
const deleteUser = require('./deleteuser.js');
const changePassword = require('./changepassword.js');
const changeName = require('./changename.js');
const repairPassword = require('./repairpassword.js');
const repairPasswordLink = require('./repairpasswordlink.js');
const socialLogin = require('./sociallogin.js');

module.exports = {
	register,
	login,
	logout,
	getCurrent,
	changeAvatar,
	reVerifyUser,
	confirmVerify,
	deleteUser,
	changePassword,
	changeName,
	repairPassword,
	repairPasswordLink,
	socialLogin,
};
