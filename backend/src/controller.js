const userService = require('./service');
const { signupSchema, loginSchema } = require('./validator');

async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    const result = await userService.createUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    console.log("error signup", error);
    res.status(400).json({ message: 'Validation failed', error });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const token = await userService.authenticateUser(email, password);

    if (!token) {
      res.status(401).json({ message: 'Authentication failed' });
    } else {
      res.status(200).json({ message: 'Authentication successful', token });
    }
  } catch (error) {
    console.error('Validation error:', error);
    res.status(400).json({ message: 'Validation failed', error: error });
  }
}

module.exports = {
  signup,
  login,
};
