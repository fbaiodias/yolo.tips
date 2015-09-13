import axios from 'axios'
import qs from 'qs'

const API_ROOT = '/api'

export default function (options) {
  return axios.get(API_ROOT + `/search?` + qs.stringify(options))
    .then(({data}) => data)
}
