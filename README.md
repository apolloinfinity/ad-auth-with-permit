const token = jwt.sign({ data: user }, process.env.SECRET, {
						expiresIn: '120s',
					});
					res.json({
						success: true,
						token: 'JWT ' + token,
						user: {
							displayName: user.displayName,
							email: user.userPrincipalName,
						},
					});# ad-auth-with-permit
