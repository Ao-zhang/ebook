let postRequest_v2 = (url, data, callback) => {
    let formData = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            formData.append(p, data[p]);
    }
debugger;
    let opts = {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };
    debugger;

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

let postReques_Params=(url,id,callback)=>{
    // url+="?id="+id;
    let data={id:id};
    debugger;
    fetch(url,{
        method:'POST',
        body:JSON.stringify(data),
        headers: {
            // 'Content-Type': 'application//x-www-form-urlencoded;charset=utf-8'
            'Content-Type': 'application/json'
        }
    }).then((response) => {
        return response.json()
    })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

export {postRequest,postRequest_v2,postReques_Params};