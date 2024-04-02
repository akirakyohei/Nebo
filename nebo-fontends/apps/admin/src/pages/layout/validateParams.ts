import { isNumber, toString } from "lodash-es";
import { ValidateParam, Validator } from "./types";
import { useParams } from "react-router-dom";

export const validateParams = (validateParams: ValidateParam[]): boolean => {
  const params = useParams();
  return validateParams.some((validateParam) => {
    const param = params[validateParam.name];
    return (
      param &&
      validateParam.validators.every((validator) => validator.validate(param))
    );
  });
};

export const NumberValidator = (): Validator => {
  return {
    validate: (value) => {
      return isNumber(value);
    },
  };
};

export const EnumValidator = (values: string[]): Validator => {
  return {
    validate: (value) => {
      return values.includes(toString(value));
    },
  };
};
