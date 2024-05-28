const newMsgHandler = require('./index');

module.exports.handler = async (event) => {
  console.log("<><> ## -- EVENT -- ## <><>",event);

  if(!event.body){
      return {
        statusCode: 200,
        body: event.queryStringParameters.validationToken,
      };

  }
  else{
    const newMsgs = (JSON. parse(event.body)).value;

    let results = {};
    for(const msg of newMsgs){
        const resourceUrl = msg.resource;
        results[resourceUrl] = await newMsgHandler.processMessage(resourceUrl);

    }
    return {
        statusCode: 200,
        body: JSON.stringify({"Success": results})
  }  }
}


