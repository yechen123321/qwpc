import axios from "axios";

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });

// Optionally the request above could also be done as
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
    getUser()
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  

async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

function getUserAccount() {
    return axios.get('/user/12345');
  }
  
  function getUserPermissions() {
    return axios.get('/user/12345/permissions');
  }
  
  const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);
  
  // OR
  async function fetchUserData() {
    try {
      const response = await axios.get('/user', {
        params: {
          ID: 12345
        }
      });
      console.log(response.data); // 假设需要处理 data 属性
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Request completed");
    }
  }
  
  fetchUserData();

    