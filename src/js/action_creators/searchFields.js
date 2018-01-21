import K from '../constants'

export const updateSearchFields = (obj) => {
  return {
    type: K.UPDATE_SEARCH_FIELDS,
    payload: obj,
  }
};
