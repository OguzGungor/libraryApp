import axios from "axios";



export const addBook = (values) => {
  var data = JSON.stringify({
    id : values["id"],
    name: values["name"],
    authors: [{ name: values["author"] }],
    image : values["image"]
  });

  var config = {
    method: "post",
    url: "http://localhost:9090/api/admin/addBook",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
    withCredentials: true,
  };

  return axios(config)
    .then(function (response) {
      return "done";
    })
    .catch(function (error) {
      return "not done" + error;
    });
};

export const removeBook = (id) => {
  var axios = require("axios");
  var data = JSON.stringify(parseInt(id));

  var config = {
    method: "post",
    url: "http://localhost:9090/api/admin/removeBook",
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
