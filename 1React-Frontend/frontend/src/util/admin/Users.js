import axios from "axios";

export const getUsers = (name) => {
  if(name){
    return axios
    .get(`http://localhost:9090/api/admin/getUsers?name=${name}`, { withCredentials: true })
    .then((result) => {
      return result.data.map((user) => ({
        id: `${user.id}`,
        name: `${user.username}`,
        image : `${user.image}`,
        role : `${user.roles[0].role}`
      }));
    });
  }else{
    return axios
    .get("http://localhost:9090/api/admin/getUsers", { withCredentials: true })
    .then((result) => {
      return result.data.map((user) => ({
        id: `${user.id}`,
        name: `${user.username}`,
        image : `${user.image}`,        
        role : `${user.roles[0].role}`
      }));
    });
  }
  
};

export const addUser = (values) => {
  return axios
    .post(
      "http://localhost:9090/api/admin/addUser",
      {
        id : values["id"],
        username: values["username"],
        encryptedPassword: values["encryptedPassword"],
        roles: [
          {
            role: values["roles"],
          },
        ],
        image : values["image"]
      },
      { withCredentials: true },
      { headers: { "content-type": "text/json" } }
    )
    .then((result) => {
      return "done";
    })
    .catch((e) => {
      return "not done";
    });
};

export const removeUser = (id) => {
  var axios = require("axios");
  var data = JSON.stringify(parseInt(id));

  var config = {
    method: "post",
    url: "http://localhost:9090/api/admin/removeUser",
    headers: {
      "Content-Type": "application/json",      
    },
    data: data,
    withCredentials : true
  };

  return axios(config)
    .then(function (response) {
      return "done";
    })
    .catch(function (error) {
      return "not done" + error;
    });
};


export const getUser = (id) => {
  return axios.get(`http://localhost:9090/api/admin/getUser?id=${id}`,{withCredentials:true}).then((result) => {
    return result.data;
  });

};