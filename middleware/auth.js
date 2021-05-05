const { Bearer } = require('permit');
const jwt = require('jsonwebtoken');

const permit = new Bearer({
	basic: 'username',
	query: 'JWT',
});

module.exports = {
	checkToken: async (req, res, next) => {
		try {
			const token = permit.check(req);
			if (!token) {
				return res.status(401).json({
					success: false,
					msg: 'Authentication is required',
				});
			}

			let payload = jwt.verify(token, process.env.SECRET);

			console.log(payload);
			res.send('Hello');
			next();
		} catch (error) {
			res.status(401).json({ err: error });
		}
	},
};
