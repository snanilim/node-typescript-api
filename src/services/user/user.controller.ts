import User from './user.model';

export const get = async (res) => {
  console.log('user call');
  res.json({user: 'users'});
};

export const post = async (res) => {
  User.name = 'Shah Noor Alam Nilim';
  User.isPublic = true;

  await User.save();
  return res.json('user save successfully');
};
