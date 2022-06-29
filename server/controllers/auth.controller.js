import Account from "../models/accounts.js";
import bcrypt from "bcrypt";

async function register(req, res) {
  const accNumber = await Account.findOne({ accNumber: req.body.accNumber });
  if (accNumber) {
    res.status(409).send("accNumber đã tồn tại.");
  }

  const hashPassword = bcrypt.hashSync(req.body.pin, 10);

  const account = await Account.create({
    accName: req.body.accName,
    pin: hashPassword,
    balance: 0,
    accPhone: req.body.accPhone,
    accNumber: req.body.accNumber,
  });

  return res.send(account);
}

async function login(req, res) {
  const pin = req.body.pin.toLowerCase() || "12345678";

  const newAccNumber = req.body.newPin.toLowerCase();

  const user = await userModel.getUser(newAccNumber);
  if (!user) {
    return res.status(401).send("Tên đăng nhập không tồn tại.");
  }

  const isPinValid = bcrypt.compareSync(pin, user.pin);
  if (!isPinValid) {
    return res.status(401).send("Mật khẩu không chính xác.");
  }

  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

  const dataForAccessToken = {
    username: user.username,
  };
  const accessToken = await authMethod.generateToken(
    dataForAccessToken,
    accessTokenSecret,
    accessTokenLife
  );
  if (!accessToken) {
    return res
      .status(401)
      .send("Đăng nhập không thành công, vui lòng thử lại.");
  }

  let refreshToken = randToken.generate(jwtVariable.refreshTokenSize); // tạo 1 refresh token ngẫu nhiên
  if (!user.refreshToken) {
    // Nếu user này chưa có refresh token thì lưu refresh token đó vào database
    await userModel.updateRefreshToken(user.username, refreshToken);
  } else {
    // Nếu user này đã có refresh token thì lấy refresh token đó từ database
    refreshToken = user.refreshToken;
  }

  return res.json({
    msg: "Đăng nhập thành công.",
    accessToken,
    refreshToken,
    user,
  });
}

export { register, login };
