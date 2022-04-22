exports.handler = async (event) => {
    let isAllowedAccess = false;
    
    const request = event.Records[0].cf.request;
    if (request && request.headers && request.headers.authorization) {
        const basicAuthHeader = request.headers.authorization[0].value;
        const authString = 'Basic ' + new Buffer('__USERNAME___TO_BE_REPLACED' + ':' + '__PASSWORD__TO_BE_REPLACED').toString('base64');
        isAllowedAccess = (basicAuthHeader === authString)
    }
    if (!isAllowedAccess) {
        const response = {
            status: 401,
            body: JSON.stringify('Restricted area!'),
            headers: {
                'www-authenticate':[{ key: 'WWW-Authenticate', value: 'Basic'}]
            },
        };
        return response;
    }
    else {
        return request;
    }
};

