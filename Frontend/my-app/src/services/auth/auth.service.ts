import axiosInstance from "../api/axiosInstance";

const userLogin = async (emailAddress: string, password: string) => {
  return axiosInstance
    .post("/login", {
      emailAddress,
      password
    })
    .then(response => {
      console.log(response.data);
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data))
      }
      return response.data;
    }).catch(e => {
        console.log(e);
        
    }) 
}

const userLogout = () => {
  localStorage.removeItem("user");
}

export default {
  userLogin,
  userLogout
};