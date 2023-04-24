// import Joi from 'joi';
import * as Yup from 'yup';

// export const loginSchema = Joi.object({
//     email: Joi.string().email({ tlds: { allow: false } }).required(),
//     password: Joi.string().min(5).required(),
//   });
export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Must be 5 characters or more').required('required'),
});