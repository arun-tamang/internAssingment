import jwt from 'jsonwebtoken';
import Boom from 'boom';

const TOKEN_EXPIRATION_PERIOD = 6000;
const PRIVATE_KEY = 'my very much but not so much private key';

export function generateTokens(data) {
  return {
    accessToken: generateAccessToken(data),
    refreshToken: generateRefreshToken(data)
  };
}

export function generateAccessToken(data) {
  return jwt.sign({ encryptedData: data }, PRIVATE_KEY , { expiresIn: TOKEN_EXPIRATION_PERIOD });
  // expiresIn takes time in seconds.
}

export function generateRefreshToken(data) {
  return jwt.sign({ encryptedData: data }, PRIVATE_KEY, { expiresIn: (TOKEN_EXPIRATION_PERIOD * 3600)});
}

// export function verifyRefreshToken(token) {
//   return jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
//     console.log('decoded in verifyRefreshToken');
//     console.log(decoded);
//   });
// }

export function checkRefreshToken(token) {
  return jwt.verify(token, PRIVATE_KEY);
}

export async function verifyAccessToken(token, req, res, next) {
  return await jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if(err) {
      // throw new Boom.unauthorized('User not found');
      // next(err);
      res.send({acsTokenSuccess: false, message: 'access token not authorized'});
    } else {
      // console.log(decoded);
      if(decoded.encryptedData == req.params.id) {
        // console.log('authorized');
        next();
      } else {
        res.send('token of another user.');
      }
      // return decoded;
    }
  });
}

export function verifyAccessToken2(token) {
  return jwt.verify(token, 'hellofromtheotherside', (err, decode) => {
    if (!err) {
      console.log('authorized');
      return decode;
    } else {
      throw new Boom.unauthorized('unauthorized user');
    }
  });
}
