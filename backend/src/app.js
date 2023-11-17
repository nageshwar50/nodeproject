const express = require('express');
const bodyParser = require('body-parser');
const { signup, login } = require('./controller');
const { signupSchema, loginSchema } = require('./validator');

const app = express();

app.use(bodyParser.json());

// Routes
app.post('/signup', signupSchema, signup);
app.post('/login', loginSchema, login);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
