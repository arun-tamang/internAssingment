import myAxios from '../../myAxios.js';

export async function logout () {
  console.log('from log out');
  console.log(myAxios.defaults.headers);
  return myAxios.delete('/admin/logout')
  .then((response) => {
    // console.log(response);
    return {response};
  })
  .catch(function (error) {
    console.log(error);
  });
}