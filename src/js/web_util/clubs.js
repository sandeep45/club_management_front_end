import axios from 'axios'

export const assignTablesStraightForClub = (clubId, numberOfTables, peoplePerTable) => {
  return axios.post(`/clubs/${clubId}/assign_tables_straight`, {
    number_of_tables: numberOfTables,
    people_per_table: peoplePerTable
  }, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const assignTablesEveryOtherForClub = (clubId, numberOfTables, peoplePerTable) => {
  return axios.post(`/clubs/${clubId}/assign_tables_every_other`, {
    number_of_tables: numberOfTables,
    people_per_table: peoplePerTable
  }, {
    headers: {
      Accept: "application/json"
    }
  });
};

export const assignTablesRandomForClub = (clubId, numberOfTables, peoplePerTable) => {
  return axios.post(`/clubs/${clubId}/assign_tables_random`, {
    number_of_tables: numberOfTables,
    people_per_table: peoplePerTable
  }, {
    headers: {
      Accept: "application/json"
    }
  });
};

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