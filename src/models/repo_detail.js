import axios from 'axios';

export default class RepoDetail {
  static fetch({ title, user }, state) {
    const host = state.config.apiUrl;
    return axios.get(`https://${host}/repos/${user}/${title}`);
  }
}
