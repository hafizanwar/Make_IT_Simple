const msal = require('@azure/msal-node');

const clientConfig = {
    auth: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        authority: `${process.env.CLOUD_INSTANCE}/${process.env.TENANT_ID}`
    }
};


async function getToken() {
    const authClient = new msal.ConfidentialClientApplication(clientConfig);
    const tokens = await authClient.acquireTokenByClientCredential({
        scopes: ['https://graph.microsoft.com/.default']
    });

    return tokens.accessToken;
}


module.exports = {
    getToken: getToken
};


module.exports.handler = async (event) => {
    let response = {"Access Token": await getToken()}
    return {
        statusCode: 200,
        body:JSON.stringify(response) 
  }
}