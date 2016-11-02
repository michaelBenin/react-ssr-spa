import axios from 'axios';
import { store } from '../redux/store/store';

export default class Search {
  static fetch(query) {
    const state = store.getState();
    const host = state.config.apiUrl;
    return axios.get(`http://${host}/search/repositories?q=${query}`);
  }
}
