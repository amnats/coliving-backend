const { getDocumentClient } = require('../helpers/aws.js');

async function profileGetHandler(req, res) {
    // parse filter
    const filter = req.body;
    //const filter = mockFilter();

    // get items from dynamo
    const expr = buildExpression(filter);

    const docClient = getDocumentClient();
    const params = {
        TableName: 'Profiles',
        ExpressionAttributeValues: expr.expressionAtrributeValues,
        FilterExpression: expr.filterExpression,
    };

    const result = await docClient.scan(params).promise();

    res.status(200).json(result);
}

// make it general
function buildExpression(filter) {
    let filterExpression = '';
    let expressionAtrributeValues = {};
    if (filter.gender !== undefined) {
        filterExpression = 'gender = :gender';
        expressionAtrributeValues = {
            ':gender': filter.gender
        };
    }

    if (filter.subway !== undefined) {
        if (filterExpression) {
            filterExpression += ' AND ';
        }
        filterExpression += 'subway = :subway';

        expressionAtrributeValues = {
            ...expressionAtrributeValues, 
            ':subway': filter.subway
        };
    }

    if (filter.budget !== undefined) {
        if (filterExpression) {
            filterExpression += ' AND ';
        }
        filterExpression += 'budget <= :budget';

        expressionAtrributeValues = {
            ...expressionAtrributeValues, 
            ':budget': filter.budget
        };
    }

    return { filterExpression, expressionAtrributeValues };
}

function mockFilter() {
    return {
        gender: 'male',
        subway: 'Тульская',
        budget: 35000
    }
}

function mockRetun() {
    return {
        data: [
            {
                facebookId: 'e4lrmx027q',
                gender: 'male',
                age: 23,
                subway: 'Тульская',
                budget: 20000,
                role: 'searcher'
            },
            {
                facebookId: 'e4lrmx027q',
                gender: 'male',
                age: 26,
                subway: 'Маяковская',
                budget: 20000,
                role: 'searcher'
            },
            {
                facebookId: 'e4lrmx027q',
                gender: 'male',
                age: 26,
                subway: 'Маяковская',
                budget: 20000,
                role: 'owner'
            },
        ],
        nextPage: false
    }
}

module.exports = {
    profileGetHandler
}