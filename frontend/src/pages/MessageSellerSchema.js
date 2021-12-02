import { string, object, number, setLocale } from 'yup';
import { ptForm } from 'yup-locale-pt';

setLocale(ptForm);

export let messageSchema = object().shape(
    {
        response: string().max(150).min(3).required()
    }
)

export let sellerSchema = object().shape(
    {
        name: string().min(3).max(32).required(),
        email: string().email().required(),
        street: string().min(9).required(),
        document: string().max(14).min(14).required(),
        ddd: number().positive().integer().required(),
        number: string().max(10).min(8).required(),
        district: string().max(25).required(),
        city: string().max(25).required(),
        state: string().max(2).min(2).required()
    }
)