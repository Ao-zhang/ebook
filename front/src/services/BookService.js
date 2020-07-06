import {postRequest,postRequest_v2,postReques_Params} from "../util/ajax";
import {apiUrl} from '../constant';
// const apiUrl="http://localhost:8080";
export const getBooks=(data, callback) => {
    debugger;
    const url = `${apiUrl}/getBooks`;
    postRequest(url, data, callback);
};

export const getBook = (id, callback) => {
    let data = {b_id: id};
    const url = `${apiUrl}/getBook`;
    postRequest(url,data, callback);
};

export const add_to_Cart = (data, callback) => {
    const url=`${apiUrl}/addIndent`;
    debugger;
    postRequest(url,data,callback);
};

export const getCart=(id,callback)=>{
    const url=`${apiUrl}/getCart`;
    let json={"u_id":id};
    postRequest(url,json, callback);
}

export const searchBooks=(data,callback)=>{
    const url=`${apiUrl}/searchbooks`;
    postRequest(url,data, callback);
}
export const deleteBooks=(data,callback)=>{
    const url=`${apiUrl}/deleteBook`;
    postRequest(url,data, callback);
}
export const insertBooks=(data,callback)=>{
    const url=`${apiUrl}/insertbook`;
    postRequest(url,data, callback);
}
export const getBooksByIds=(data,callback)=>{
    const url=`${apiUrl}/findBooksbyid`;
    postRequest(url,data, callback);
}
