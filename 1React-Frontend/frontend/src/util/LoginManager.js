import Axios from "axios";

export const loginRequest = (username,password) => {
    const formData = new FormData();
    formData.append("username",username);
    formData.append("password",password);
  return Axios.post("http://localhost:9090/login",formData,{withCredentials : true}).then(function (response) {
    return roleRequest().then((result)=>{
      return result});
  })
  .catch(function (error) {
    console.log(error);
  });;
};

export const getRole = () => {


}

export const roleRequest = () =>{

var config = {
  method: 'get',
  url: 'http://localhost:9090/api/common',
  withCredentials : true
};

return Axios(config)
.then(function (response) {
  return `${response.data}`;
})
.catch(function (error) {
  return error;
});

}

/*export const roleRequest = () => {
  return Axios.get("localhost:9090/api/common", { withCredentials: true })
    .then(function (response) {
      return response;
    })
};*/
