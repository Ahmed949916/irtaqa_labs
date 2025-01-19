
import * as Yup from 'yup';

export const signUpSchema = Yup.object()
  .strict()
  .shape({
    name: Yup.string().required('Name is required'),

  
    email: Yup.string()
      .email('Invalid email format')
      .matches(/\.[A-Za-z]{2,}$/, 'Email must end with a valid TLD (e.g. .com, .net, .org)')
      .required('Email is required'),

    password: Yup.string()
      .min(6, 'Minimum 6 characters')
      .required('Password is required'),
      
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });
