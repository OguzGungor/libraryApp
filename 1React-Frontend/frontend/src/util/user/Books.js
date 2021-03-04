import axios from "axios";

export const addFavBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/addFavBook",
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
      return "not done : " + error;
    });
};

export const addReadBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/addReadBook",
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
      return "not done : " + error;
    });
};

export const getFavBooks = () => {
  return axios
    .get("http://localhost:9090/api/user/getFavBooks", {
      withCredentials: true,
    })
    .then((result) => {
      return result.data.map((book) => ({
        id: `${book.id}`,
        name: `${book.name}`,
        author: `${book.authors[0].name}`,
        image : `${book.image}`
      }));
    });
};

export const getReadBooks = () => {
  return axios
    .get("http://localhost:9090/api/user/getReadBooks", {
      withCredentials: true,
    })
    .then((result) => {
      return result.data.map((book) => ({
        id: `${book.id}`,
        name: `${book.name}`,
        author: `${book.authors[0].name}`,
        image : `${book.image}`
      }));
    });
};

export const removeFavBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/removeFavBook",
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


export const removeReadBook = (id) => {
  var data = JSON.stringify(id);

  var config = {
    method: "post",
    url: "http://localhost:9090/api/user/removeReadBook",
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