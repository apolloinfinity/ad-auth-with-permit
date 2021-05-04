const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const { checkToken } = require('../middleware/auth');

const ad = require('../config/ad.config');

router.get('/', (req, res) => {
	res.send('hello');
});

router.post('/authenticate', async (req, res) => {
	const { email, password } = await req.body;
	ad.authenticate(email, password, (err, auth) => {
		if (err) throw err;

		if (!auth) {
			res.json({ success: false, msg: 'Wrong email or password' });
		} else {
			ad.findUser(email, (err, user) => {
				if (err) throw err;
				if (!user) {
					res.json({ success: false, msg: 'User not found' });
				} else {
					ad.getGroupMembershipForUser(
						user.sAMAccountName,
						(err, groups) => {
							if (err) throw err;
							const token = jwt.sign(
								{ data: user },
								process.env.SECRET,
								{
									expiresIn: '120s',
								}
							);
							res.json({
								success: true,
								token: 'JWT ' + token,
								user: {
									displayName: user.displayName,
									email: user.userPrincipalName,
									groups: groups,
								},
							});
						}
					);
				}
			});
		}
	});
});

// Restricted route
router.get('/protected', checkToken, (req, res) => {
	res.send('Hello super nintendo charmers');
});

module.exports = router;
