import axios from 'axios';

export default class Search {
  static fetch(query, store) {
    const state = store.getState();
    const host = state.config.apiUrl;
    return axios.get(`http://${host}/search/repositories?q=${query}`);
  }
}
