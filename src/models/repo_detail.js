import axios from 'axios';
import { store } from '../redux/store/store';

export default class RepoDetail {
  static fetch({ title, user }) {
    const state = store.getState();
    const host = state.config.apiUrl;
    return axios.get(`https://${host}/repos/${user}/${title}`);
  }
}
