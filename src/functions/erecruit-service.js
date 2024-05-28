const axios = require('axios');
const { XMLParser} = require("fast-xml-parser");



async function checkUserType(email){

    const erecruitAPI = {
        authUrl: `${process.env.EREC_V1_ENDPOINT}/Authenticate?UserName=${process.env.EREC_V1_USERNAME}&Password=${process.env.EREC_V1_PASSWORD}&EntityID=00000000-0000-0000-0000-000000000E01`,
        getUserByMailUrl:function(userMail){
            return `${process.env.EREC_V1_ENDPOINT}/User/00000000-0000-0000-0000-000000000E01/${userMail}?UserName=${process.env.EREC_V1_USERNAME}&Password=${process.env.EREC_V1_PASSWORD}&EntityID=00000000-0000-0000-0000-000000000E01`

        }
    }

    try {
        // 1. Authentication
        const authResponse = await axios.post(erecruitAPI.authUrl);

        // 2. set cookies
        const cookie = authResponse.headers['set-cookie'];
        axios.defaults.headers.cookie = cookie;

        let response = {};
        // 3. call get user endpoint 
        let url = erecruitAPI.getUserByMailUrl(email)
        const gettingUserResponse = await axios.post(url);

        // 4. parse xml response to json obj
        const parser = new XMLParser();
        let jsonRes = parser.parse(gettingUserResponse.data);
        console.log("jsonRes >>",jsonRes)

        // 5. check wether user is Candidate or Contact
        if(!jsonRes.ListResponse){
            return "Not Found!";

        }
        else if(jsonRes.ListResponse.Data.Candidate){
            return "Candidate" ;
        }
        else if(jsonRes.ListResponse.Data.Contact){
            return "Contact" ;

        }

    } catch (error) {
        console.log("Error ##!!>>",error)
        return error;
    }
};

module.exports = {
    checkUserType: checkUserType
}