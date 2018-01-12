import * as userService from './userService.js';
import * as tokenService from './tokenService.js';
import HttpStatus from 'http-status-codes';

export async function register(req, res, next) {
  userService
    .createUser(req.body)
    .then(data => res.status(HttpStatus.CREATED).json({ data }))
    .catch(err => next(err));
}

export async function logout(req, res, next) {
  let rfsToken = req.headers.authorization;
  let logoutResult = await tokenService.removeRefreshToken(rfsToken);
  // console.log('result of logout from adminService');
  // console.log(logoutResult);
  if (logoutResult) {
    console.log('successful logout');
    // logoutResult.resolve('Successfully logged out');
  }

  return logoutResult;
}

// // Admin stuff
//
// export async function register(req, res, next) {
//   let regParams = req.body;
//   // regParams is an object with email and password keys.
//   let returnMessage = '';
//   let emailExists = await getUserByEmail(regParams.email);
//   let pswdExists = await getUserByPassword(regParams.password);
//   if(emailExists != null) {
//     returnMessage = 'Sorry email-id already exists. Try new email-id';
//     let a = {success: false, msg: returnMessage};
//     return(a);
//   } else if(pswdExists) {
//     returnMessage = 'Sorry password already exists. Try new password';
//     // console.log(returnMessage);
//     return({success: false, msg: returnMessage});
//   } else {
//     await createUser(regParams)
//       .then(data => res.status(HttpStatus.CREATED).json({ data }))
//       .catch(err => next(err));;
//     returnMessage = 'Successfully created new Account';
//     return({success: true, msg: returnMessage});
//   }
// };

export async function login(req, res, next) {
  try {
    // console.log('in login of userService');
    let loginParams = req.body;
    let validationResult = await userService.validateUser(req.body);
    // validateUser is async function so i got different result when i didn't use await.
    if (validationResult.validated === true) {
      // Now you can give token to the client.
      let tokens = await tokenService.fetchTokens(validationResult.userInfo.id);
      tokenService.addRefreshToken(tokens.refreshToken);

      return { userInfo: validationResult.userInfo, tokens: tokens };
    } else {
      // wrong email or password
      throw 'wrong email or password';
    }
  } catch (e) {
    // handle error here
    console.log('error occurred in login');
    // res.send(e);
    throw e;
  }
}

export async function refreshAccessToken(token) {
  try {
    let decoded = await tokenService.checkRefreshToken(token);
    if (!decoded) {
      throw 'refreshToken may have expired';
    } else {
      let newAcsToken = await tokenService.fetchAccessToken(
        decoded.encryptedData
      );
      return newAcsToken;
    }
  } catch (err) {
    throw err;
  }
}
