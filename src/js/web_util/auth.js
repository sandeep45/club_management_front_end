import axios from 'axios'

export const signIn = (params) => {
  return axios.post(`/auth/sign_in`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
};

export const signUp = (params) => {
  return axios.post(`/auth`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
};


export const signOut = () => {
  return axios.delete(`/auth/sign_out`)
};
