
const msGraphService = require('./ms-graph-service');
const erecruitService = require('./erecruit-service');
const msal = require('@azure/msal-node');


async function processMessage(msgUrl){
    try {
        // 1. Read Email
        const res = await msGraphService.retreiveMsg(msgUrl);
        const msg = res.data;

        if(!msg.sender)
            return true;
        const msgId = msg.id;
        const msgSenderMail = msg.sender.emailAddress.address;
        let msgCategories = msg.categories;

        // 2. check if the sender is a candidate or contact using erecruit API
        const senderType = await erecruitService.checkUserType(msgSenderMail);

        // 3. attach category to mail
        if(senderType == "Candidate" || senderType == "Contact"){
            msgCategories.push(senderType)
            await msGraphService.updateMailCategory(msgId, msgCategories);
        }
        // For Test
        else{
            msgCategories.push("Not Erecruit User")
            await msGraphService.updateMailCategory(msgId, msgCategories);
        }
        
        return true;
        
    } catch (error) {
        console.log("Error ##!!>>",error)
        return false;
    }

  };


  module.exports = {
    processMessage: processMessage
  };

  module.exports.handler = async (event) => {
    const newMsgs = (JSON. parse(event.body)).value;

    let results = {};
    for(const msg of newMsgs){
        const resourceUrl = msg.resource;
        results[resourceUrl] = await processMessage(resourceUrl);

    }
    return {
        statusCode: 200,
        body: JSON.stringify({"Success": results})
  }
  }