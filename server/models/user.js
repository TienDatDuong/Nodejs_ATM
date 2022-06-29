import Lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('data.json');
const db = lowdb(adapter);

const TABLENAME = 'users';

exports.getUser = async newAccNumber => {
	try {
		const data = await db.get(TABLENAME).find({newAccNumber: newAccNumber}).value();
		return data;
	} catch {
		return null;
	}
};

exports.createUser = async accNumber => {
	try {
		await db.get(TABLENAME).push(accNumber).write();
		return true;
	} catch {
		return false;
	}
};
exports.updateRefreshToken = async (pin, refreshToken) => {
	try {
		await db
			.get(TABLENAME)
			.find({newAccNumber: newAccNumber})
			.assign({refreshToken: refreshToken})
			.write();
		return true;
	} catch {
		return false;
	}
};

return res.json({
  msg: 'Đăng nhập thành công.',
  accessToken,
  refreshToken,
  user,
});