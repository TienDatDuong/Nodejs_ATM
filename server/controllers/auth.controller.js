import Account from "../models/accounts.js";
import bcrypt from "bcrypt";
import tokenService from "../services/token.service.js";

async function register(req, res) {
  const accNumber = await Account.findOne({ accNumber: req.body.accNumber });
  if (accNumber) {
    res.status(409).send("accNumber đã tồn tại.");
  }

  const hashPassword = bcrypt.hashSync(req.body.pin, 10);

  const account = await Account.create({
    accName: req.body.accName,
    pin: hashPassword,
    balance: req.body.balance,
    accPhone: req.body.accPhone,
    accNumber: req.body.accNumber,
  });

  return res.send(account);
}

async function login(req, res) {
  const user = await Account.findOne({ accNumber: req.body.accNumber });
  if (!user) {
    res.status(404).json("wrong usernumber");
  }
  const pin = await bcrypt.compare(req.body.pin, user?.pin);
  if (!pin) {
    res.status(404).json("wrong password");
  }
  if (user && pin) {
    const accessToken = tokenService.generateToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);
    res.status(200).json({ accessToken, refreshToken });
  }
}

export { register, login };
