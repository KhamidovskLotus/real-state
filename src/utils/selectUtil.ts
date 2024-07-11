import { SelectOption } from 'types/selectOption';

export const stringToSelectOption = (val: string[]): SelectOption[] => {
  return val.map((v) => ({ label: v, value: v }));
};
