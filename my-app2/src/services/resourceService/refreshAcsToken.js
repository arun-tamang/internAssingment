import myAxios from '../../myAxios';

export function refreshAcsToken () {
  let myUrl = '/admin/refresh';
  return myAxios.post(myUrl)
  .then((response) => {
    return response;
  });
}
