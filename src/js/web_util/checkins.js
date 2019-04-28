import axios from 'axios'
import {club} from "../config/mySchema";

// CRUD

export const createCheckin = (clubId, memberId) => {
  return axios.post(`/clubs/${clubId}/members/${memberId}/checkins`, { }, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
};

export const getCheckins = (clubId, memberId) => {
  return axios.get(`/clubs/${clubId}/members/${memberId}/checkins`, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const removeCheckin = (clubId, memberId, checkinId) => {
  return axios.delete(`/clubs/${clubId}/members/${memberId}/checkins/${checkinId}`, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const updateCheckin = (clubId, memberId, checkinId, params) => {
  return axios.put(`/clubs/${clubId}/members/${memberId}/checkins/${checkinId}`, params, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
};