const { getDocumentClient } = require('../helpers/aws.js');

async function profilePostHandler(req, res) {
    const item = {
        ...req.body,
        //...mockSearcher(),
        createDateTime: Date.now()
    }

    // If photos are files then save to db. Or to facebook?
    
    // write to dynamo
    const docClient = getDocumentClient();
    const table = 'Profiles';

    const params = {
        TableName: table,
        Item: item,
        ConditionExpression: 'attribute_not_exists(facebookId)'
    }

    try {
        const data = await docClient.put(params).promise();
        console.log('Added item:', data);
        res.sendStatus(200);
    } catch (err) {
        console.error('Unable to add item. Error JSON:', err);
        res.sendStatus(500);
    }
}

function mockSearcher() {
    return {
        facebookId: 'e4lrmx027q',
        gender: 'male',
        age: 23,
        subway: 'Тульская',
        budget: 20000,
        role: 'searcher'
    }
}

function mockOwner() {
    return {
        ...mockSearcher(),
        role: 'owner',
        roomPhotos: [
            '1123', '12312'
        ]
    }
}

module.exports = {
    profilePostHandler
};