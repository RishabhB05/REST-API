const express = require('express')
const users = require('./MOCK_DATA.json')
const app = express();

app.get('/', (req, res) => {
  return res.send('type /users to see users data');
});

app.get('/users', (req, res) => {
  return res.json(users);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 