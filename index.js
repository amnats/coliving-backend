const express = require('express');
profilePostHandler = require('profile_post');

const app = express();
const port = 3000;


app.post('/profile', profilePostHandler);

app.get('/profile', profileGetHandler);


app.listen(port, () => {
    console.log(`App listening on port ${port}}`);
});