import myAxios from '../../myAxios.js';

export async function login (userInfo) {
  // you need to have await here because downloadedTodos called after this login depends on tokens
  // that is only given after this post finishes and responds so login should not return before this.
  // console.log('from login');
  // console.log(userInfo);
  return myAxios.post('/admin/login', userInfo)
  .then((response) => {
    // console.log(response);
    return {data: response.data, success: true};
  })
  .catch(function (error) {
    console.log(error);
  });
}
