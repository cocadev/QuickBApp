/**
 * @file Api.js
 * @description This file contain all the configuration about the backend connection.
 * @author Fernando Mondragón
 * @date 18 MAY 2019
 * @version v1.1
 */

/**
 * @description Export the constants for than we can use in other side.
 * @export {Object}
 */
export const ApiClient = {
    getLoginResponse,
    getSocialLoginResponse,
    getRegisterResponse,
    getCategoriesItems,
    getBusinessList,
    getBusinessSearch,
    getBusinessDetail,
    getBussinesSetting,
    getBussinesSubcategoryList,
    postComentarie,
    getBusinessMap,
    getLikeBussines,
    postLikeBussines,
    getMessages,
    postMessages
}

/**
 * @proyect QuickB
 * @const  {*} apiRoutes
 */
const apiRoutes = {
    login: 'Apis/LogIn',
    socialLogin: 'Apis/socialLogin',
    register: 'Apis/User/Register',
    categoryList: 'Apis/Category/List',
    bussinesList: 'Apis/Business/List',
    bussinesSearch: 'apis/business/search',

    businessDetail: 'apis/business/detail',
    bussinesSetting: 'Apis/Icon/List',
    bussinesSubcategoryList: 'apis/subcategory/list',
    comentarie: 'apis/add/comment/action',
    businessMap: 'Apis/Map/Business/List',
    likeBussinesStatus: 'apis/bussines/like/get',
    likeBussines: 'apis/bussines/like/action',
    messages: 'apis/bussines/get/msgs',
    sendMessages: 'apis/bussines/msgs/action'
};

/**
 * @proyect QuickB
 * @const  {String} baseUrl
 */
const baseUrl = "https://admin.quickb.mx/";

/**
 * @function getLoginResponse()
 * @description This function return us the response than we receive of the backend when we want log in.
 * @param {*} params
 * @return {Object} 
 */
function getLoginResponse(params) {
    return fetch(baseUrl + apiRoutes.login, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getSocialLoginResponse()
 * @description This function return us the response than we receive of the backend when we want log in.
 * @param {*} params
 * @return {Object} 
 */
function getSocialLoginResponse(params) {
    return fetch(baseUrl + apiRoutes.socialLogin, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getRegisterResponse()
 * @description This function return us the response than we receive of the backend when we register.
 * @param {*} params
 * @return {Object} 
 */
function getRegisterResponse(params) {
    return fetch(baseUrl + apiRoutes.register, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getRegisterResponse()
 * @description This function return us the response than we receive of the backend when we want receive the all categories.
 * @param {NULL}
 * @return {Object} 
 */
function getCategoriesItems() {
    return fetch(baseUrl + apiRoutes.categoryList).then(responseHandler);
}

/**
 * @function getBusinessList()
 * @description This function return us the response than we receive of the backend when we want get all the bussines of any categorie.
 * @param {*} params
 * @return {Object} 
 */
function getBusinessList(params) {
    return fetch(baseUrl + apiRoutes.bussinesList, getRequestConfig(params)).then(responseHandler);
}
function getBusinessSearch(params) {
    return fetch(baseUrl + apiRoutes.bussinesSearch, getRequestConfig(params)).then(responseHandler);
}


/**
 * @function getBusinessDetail()
 * @description This function return us the response than we receive of the backend when we want get all the informatio of a bussines.
 * @param {*} params
 * @return {Object} 
 */
function getBusinessDetail(params) {
    return fetch(baseUrl + apiRoutes.businessDetail, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getBussinesSetting()
 * @description This function return us the response than we receive of the backend when we want get all the tools for administrate all the bussines.
 * @param {*} params
 * @return {Object} 
 */
function getBussinesSetting(params) {
    return fetch(baseUrl + apiRoutes.bussinesSetting, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getBussinesSubcategoryList()
 * @description This function return us the response than we receive of the backend when we want log in.
 * @param {*} params
 * @return {Object} 
 */
function getBussinesSubcategoryList(params) {
    return fetch(baseUrl + apiRoutes.bussinesSubcategoryList, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function postComentarie()
 * @description This function return us the response than we receive of the backend when we want add a comentarie.
 * @param {*} params
 * @return {Object} 
 */
function postComentarie(params) {
    return fetch(baseUrl + apiRoutes.comentarie, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getBusinessMap()
 * @description This function return all the descripion for map the bussines.
 * @param {*} params
 * @return {Object} 
 */
function getBusinessMap(params) {
    return fetch(baseUrl + apiRoutes.businessMap, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getLikeBussines()
 * @description This function post the like value of the bussines detail.
 * @param {*} params
 * @return {Object} 
 */
function getLikeBussines(params) {
    return fetch(baseUrl + apiRoutes.likeBussinesStatus, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function postLikeBussines()
 * @description This function post the like value of the bussines detail.
 * @param {*} params
 * @return {Object} 
 */
function postLikeBussines(params) {
    return fetch(baseUrl + apiRoutes.likeBussines, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getMessages()
 * @description This function return us the response than we receive of the backend when we want log in.
 * @param {*} params
 * @return {Object} 
 */
function getMessages(params) {
    return fetch(baseUrl + apiRoutes.messages, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function postMessages()
 * @description This function return us the response than we receive of the backend when we want log in.
 * @param {*} params
 * @return {Object} 
 */
function postMessages(params) {
    return fetch(baseUrl + apiRoutes.sendMessages, getRequestConfig(params)).then(responseHandler);
}

/**
 * @function getRequestConfig()
 * @description This function do the petition to the backend and receive all the parameters than we need use.
 * @param {*} params
 * @return {Object} 
 */
function getRequestConfig(params) {
    let formBody = null;

    if (params != null) {
        formBody = []
        for (var property in params) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(params[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }

        formBody = formBody.join("&");
    }

    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody
    }
}

/**
 * @function responseHandler()
 * @description This function decode the response of the backend for whe can use the information.
 * @param {*} response
 * @return {Object} 
 */
function responseHandler(response) {
    return response.json();
}