import myAxios from '../../myAxios.js';

export async function login (userInfo) {
  return myAxios.post('/admin/login', userInfo)
  .then((response) => {
    // console.log(response);
    return {data: response.data, success: true};
  })
  .catch(function (error) {
    console.log(error);
  });
}
