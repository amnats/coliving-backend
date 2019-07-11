const AWS = require('aws-sdk');

let dynamodb;

function init() {
    AWS.config.update({
        region: 'us-west-2',
        endpoint: 'http://localhost:8000'
    });

    dynamodb = new AWS.DynamoDB();
    
    // for development
    createTable();
}

function createTable() {
    const params = {
        TableName: 'Profiles',
        KeySchema: [
            { AttributeName: 'facebookId', KeyType: 'HASH' }, // partition key
        ],
        AttributeDefinitions: [
            { AttributeName: 'facebookId', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {       
            ReadCapacityUnits: 10, 
            WriteCapacityUnits: 10
        }
    };

    dynamodb.createTable(params, function(err, data) {
        if (err) {
            if (err.message === 'Cannot create preexisting table') {
                console.log('AWS sdk for dynamo db is initialised.')
                return;
            }
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
}

let docClient;
function getDocumentClient() {
    if (docClient === undefined) {
        docClient = new AWS.DynamoDB.DocumentClient();
    }

    return docClient;
}

module.exports = {
    init,
    getDocumentClient
}