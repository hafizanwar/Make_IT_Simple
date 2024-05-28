const msGraphService = require('./ms-graph-service');

module.exports.handler = async (event) => {
    let date = new Date();
    date.setDate(date.getDate() + 6);
    const body = {
        "changeType": "created",
        "notificationUrl": `${process.env.NOTIFICATION_TRIGGER_URL}`,
        "resource": "users/c9925f81-c960-49f8-9a5c-1b5bee69634e/mailFolders('Inbox')/messages",
        "expirationDateTime":`${date.toISOString()}`,
        "clientState": "secretClientValue",
        "latestSupportedTlsVersion": "v1_2"
     }

     const response = await msGraphService.createSubscription(body);
     console.log("<-- subscription creation response --> ",response);

    return {
        status:200,
        body: JSON.stringify(response)
    }
}