const ActiveDirectory = require('activedirectory');
const dotenv = require('dotenv');
dotenv.config();

const config = {
	url: process.env.AD_HOST,
	baseDN: process.env.AD_BASEDN,
	username: process.env.AD_USER,
	password: process.env.AD_PASS,
	// attributes: {
	// 	user: [ 'dn', 'userPrincipalName', 'displayName' ],
	// },
};

const AD = new ActiveDirectory(config);

module.exports = AD;
