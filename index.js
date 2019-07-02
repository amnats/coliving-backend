const express = require('express');
const app = express();
const port = 3000;

app.post('/profile', (req, res) => {

});

app.listen(port, () => 
    {
        console.log(`App listening on port ${port}}`);
    }
);