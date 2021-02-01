import axios from 'axios';

let useDevApi = location.hostname.split('.')[0] === 'dev' || location.hostname.split('.')[0] === '127';

const urlRoot = useDevApi
    ? 'https://dev.api.trucktracker.net/'
    : 'https://api.trucktracker.net/';

let Api = {
    get: function (endPoint) {
      return axios.get(urlRoot + endPoint, {withCredentials: true})
        .then(response => {
          // We keep this here, generic API stuff can go here
          return response;
        }).catch(error => {
          console.log('Error on endpoint: ' + endPoint);
          console.log(error);
          throw error;
        });
  },

  post: function (endPoint, postObject) {
      return axios.post(urlRoot + endPoint, postObject, {withCredentials: true})
        .then(response => {
          // We keep this here, generic API stuff can go here
            return response;
        }).catch(error => {
          console.log(error);
          throw error;
        });
  },

  patch: function (endPoint, patchObject) {
    return axios.patch(urlRoot + endPoint, patchObject, { withCredentials: true })
      .then(response => {
        // We keep this here, generic API stuff can go here
        return response;
      }).catch(error => {
        console.log(error);
        throw error;
      });
  },
};

export default Api;
