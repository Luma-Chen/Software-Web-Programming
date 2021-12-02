import { string, object, number, setLocale } from "yup";
import { ptForm } from "yup-locale-pt";

setLocale(ptForm);
export let productSchema = object().shape({
  name: string().required(),
  price: number().required(),
  description: string().min(5).required(),
  category: string().required(),
  images: string().max(300).required(),
});
