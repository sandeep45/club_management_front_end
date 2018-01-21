import axios from 'axios'

// CRUD

export const createClub = (params) => {
  return axios.post(`/clubs`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
};

export const getClub = (clubId) => {
  return axios.get(`/clubs/${clubId}`, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const getClubs = () => {
  return axios.get(`/clubs`, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const updateClub = (clubId, params) => {
  return axios.put(`/clubs/${clubId}`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
};

export const removeClub = (clubId) => {
  return axios.delete(`/clubs/${clubId}`, {
    headers: {
      Accept: "application/json"
    }
  });
};