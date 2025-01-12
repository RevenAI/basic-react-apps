/** 
 * @description A function to perform API request.
 * @accept can work with GET, POST, PUT, PATCH, DELETE
 * @params ReqURL: The endpoint url. optionsObj: Object containing the request method, header and body property to be created, updated or deleted. 
 * @returns errMsg: Returns error message if error otherwise returns nothing.
*/
const apiRequest = async (ReqURL = '', optionsObj = null, errMsg = null) => {
    if (!ReqURL || typeof ReqURL !== 'string') {
        throw new Error('Request url is not provided or invalid.');
    }

    try {
        const response = await fetch(ReqURL, optionsObj);
        if (!response.ok) throw new Error('Invalid request: Please reload the app.');
    } catch (error) {
        errMsg = error.message;
    } finally {
        return errMsg;
    }
}

export default apiRequest;