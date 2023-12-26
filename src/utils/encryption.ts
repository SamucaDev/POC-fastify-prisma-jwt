import bcrypt from 'bcrypt';

const hashPassword = async (value: string) => {
  const SALT_ROUNDS = 10;
  const hash = await bcrypt.hash(value, SALT_ROUNDS);
  return hash;
};

const comparePassword = async (data: string, encrypted: string) => {
  const compare = await bcrypt.compare(data, encrypted);
  return compare;
};

export { hashPassword, comparePassword };