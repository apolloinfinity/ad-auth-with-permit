const { Bearer, Basic } = require('permit');

const permit = new Bearer({
	basic: 'username',
	query: 'JWT',
});

module.exports = {
	checkToken: (req, res, next) => {
		const token = permit.check(req);
		if (!token) {
			permit.fail(res);
			return next(new Error('Authentication failed!'));
		}

		console.log(token);
		res.send('Hello');
	},
};
