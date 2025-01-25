type EnumType = { [key: string]: string };

type Option = { label: string; value: string };

export const enumToOptionsUseCase = <T extends EnumType>(
  enumObj: T
): Option[] =>
  Object.keys(enumObj).map(key => {
    return {
      label: key,
      value: key,
    };
  });
