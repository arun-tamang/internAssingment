import myAxios from '../../myAxios.js';

export async function login(userInfo) {
  return myAxios
    .post('/admin/login', userInfo)
    .then((response) => {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
}
