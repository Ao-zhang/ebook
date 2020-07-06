import {postRequest,postRequest_v2,postReques_Params} from "../util/ajax";
import {apiUrl} from '../constant';
export const getCart=(u_id, callback) => {

    const url = `${apiUrl}/getcart`;
    let data={u_id:u_id};
    postRequest(url, data, callback);
};
export const addtoCart=(carts, callback) => {

    const url = `${apiUrl}/addCarts`;

    postRequest(url,carts, callback);
};

export const buy=(order, callback) => {

    const url = `${apiUrl}/buy`;
    postRequest(url,order, callback);
};
export const getorders=(json, callback) => {

    const url = `${apiUrl}/getOrders`;
    postRequest(url,json, callback);
};
export const getTopSeller=(json, callback) => {
//{num: XX}
    const url = `${apiUrl}/getTopSeller`;
    postRequest(url,json, callback);
};
export const getTopConsume=(json, callback) => {
//{num: XX}
    const url = `${apiUrl}/getTopConsume`;
    postRequest(url,json, callback);
};
export const getPersonalConsume=(json, callback) => {
//{u_id: XX}
    const url = `${apiUrl}/getPersonalConsume`;
    postRequest(url,json, callback);
};

