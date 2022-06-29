
import { Jwt } from 'jsonwebtoken';
import { promisify } from 'util';

const sign = promisify(Jwt.sign).bind(Jwt);
const verify = promisify(jwt.verify).bind(jwt);

exports.generateToken = async (payload, secretSignature, tokenLife) => {
	try {
		return await sign(
			{
				payload,
			},
			secretSignature,
			{
				algorithm: 'HS256',
				expiresIn: tokenLife,
			},
		);
	} catch (error) {
		console.log(`Error in generate access token:  + ${error}`);
		return null;
	}
};

return await sign(
  {
      payload,
  },
  secretSignature,
  {
      algorithm: 'HS256',
      expiresIn: tokenLife,
  },
);

let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
if (!user.refreshToken) {
    // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
    await userModel.updateRefreshToken(user.username, refreshToken);
} else {
    // Nếu user này đã có refresh token thì lấy refresh token đó từ database
    refreshToken = user.refreshToken;
}