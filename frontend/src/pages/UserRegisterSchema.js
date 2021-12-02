import { string, object, setLocale, ref } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);

export let userRegisterSchema = object().shape({
  name:string().max(25).min(3).required(),
  userName: string().email().required(),
  password: string().min(6).max(9).required(),
  confirmPassword: string().oneOf([ref("password"), null]).required()
});