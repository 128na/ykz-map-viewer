import axios from 'axios'
export default {
  // APIモック
  fetch() {
    return axios.get('data.json')
  },
}