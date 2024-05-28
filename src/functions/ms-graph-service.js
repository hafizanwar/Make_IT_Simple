
const auth = require('./ms-auth');
const axios = require('axios');


const graphEndPoints = {
    users: `${process.env.GRAPH_ENDPOINT}/users`,
    userMails: `${process.env.GRAPH_ENDPOINT}/users/${process.env.ERECRUIT_PLUGIN_MS_USER_ID}/messages`,
    userMsgUrl:function(msgId){
        return `${process.env.GRAPH_ENDPOINT}/users/${process.env.ERECRUIT_PLUGIN_MS_USER_ID}/messages/${msgId}`;
    }
}

async function authenticate(){
    const accessToken = await auth.getToken();
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    return options;
}

async function retreiveMails(){
    try {
        // 1. MSAL authentication
        const options = await authenticate();

        // 2. Read User Mails
        const response = await axios.get(graphEndPoints.userMails, options);

        return response;

    } catch (error) {
        console.log("Error ##!!>>",error)
        return error;
    }
};

async function updateMailCategory(msgId, categories){
    try {
        const options = await authenticate();
        const body =  {categories: categories};
        const response = await axios.patch(graphEndPoints.userMsgUrl(msgId), body, options);
        
        return response;

    } catch (error) {
        console.log("Error ##!!>>",error)
        return error;
    }
};

async function retreiveMsg(resourceUrl){
    try {
        const options = await authenticate();
        const response = await axios.get(process.env.GRAPH_ENDPOINT+'/'+resourceUrl, options);
        
        return response;

    } catch (error) {
        console.log("Error ##!!>>",error)
        return error;
    }
};

async function createSubscription(requestBody){
    try {
        const options = await authenticate();
        const response = await axios.post(process.env.GRAPH_ENDPOINT+'/subscriptions', requestBody, options);
        
        return response;

    } catch (error) {
        console.log("Error ##!!>>",error)
        return error;
    }
}

module.exports = {
    retreiveMails: retreiveMails,
    retreiveMsg: retreiveMsg,
    updateMailCategory: updateMailCategory,
    createSubscription: createSubscription
};


module.exports.handler = async (event) => {
    // const msgId = event.queryStringParameters.msgId;
    const resourceUrl = event.queryStringParameters.resource;
    const response = await retreiveMsg(resourceUrl);
    // const response = await retreiveMails();
    // const response = await updateMailCategory("AAMkADhiNDZlYTViLWY2ZjEtNDllOC04YTBjLTJjOTRmNGU3NmE1ZABGAAAAAAB3kpdpO2n_TY5NxFz-UyrkBwBYJQrAdXgXRYMtmAfgxuCrAAAAAAEMAABYJQrAdXgXRYMtmAfgxuCrAAAH8JZ8AAA=","test category");
    return {
        statusCode: 200,
        body: JSON.stringify(response.data)
    }
        
}
