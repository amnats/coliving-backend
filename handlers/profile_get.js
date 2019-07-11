const { getDocumentClient } = require('../helpers/aws.js');

async function profileGetHandler(req, res) {
    // parse filter

    // get items from dynamo
    const docClient = getDocumentClient();

    // return 
    const params = {
        TableName: 'Profiles',
        
    }

    res.sendStatus(200);
}

module.exports = {
    profileGetHandler
}