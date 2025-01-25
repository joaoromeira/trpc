import bcryptjs from 'bcryptjs';

type ComparePasswordUseCaseInput = {
  plainTextPassword: string;
  hashedPassword: string;
};

export const comparePasswordUseCase = async ({
  plainTextPassword,
  hashedPassword,
}: ComparePasswordUseCaseInput): Promise<boolean> => {
  const isEqual = await bcryptjs.compare(plainTextPassword, hashedPassword);
  return isEqual;
};
