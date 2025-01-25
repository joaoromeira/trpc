import bcryptjs from 'bcryptjs';

export const hashPasswordUseCase = async (
  plainTextPassword: string
): Promise<string> => {
  const hashedPassword = await bcryptjs.hash(plainTextPassword, 10);
  return hashedPassword;
};
