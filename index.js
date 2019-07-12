const { init } = require('./helpers/aws.js');
const express = require('express');
const cors = require('cors');
const { profilePostHandler } = require('./handlers/profile_post.js');
const { profileGetHandler } = require('./handlers/profile_get.js');
const { asyncMiddleware } = require('./middleware/async.js');
const { isAuthed } = require('./middleware/auth.js')

init(); // init aws sdk for dynamodb

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    if(!isAuthed(req)) {
        res.sendStatus(401);
    };

    next();
});

app.post('/profile', asyncMiddleware(profilePostHandler));
app.get('/profile', asyncMiddleware(profileGetHandler));

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
