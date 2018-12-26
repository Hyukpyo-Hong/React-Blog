import Axios from 'axios';
import { validateAll } from 'indicative';
import config from '../config';

export default class AuthService {
  registerUser = async (data) => {
    const rules = {
      name: 'required|string',
      email: 'required|email',
      password: 'required|string|min:6|confirmed',
    };

    const message = {
      required: 'This {{field}} field is required.',
      'email.email': 'The eamil is invalid',
      'password.confirmed': 'The password confirmation does not match.',
    };

    try {
      await validateAll(data, rules, message);
      const response = await Axios.post(`${config.apiUrl}/auth/register`, {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return response.data.data;
    } catch (errors) {
      const formattedErrors = {};
      if (errors.response && errors.response.status === 422) {
        // eslint-disable-next-line
        formattedErrors.email = errors.response.data.email[0];
        return Promise.reject(formattedErrors);
      }
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      return Promise.reject(formattedErrors);
    }
  }

  loginUser = async (data) => {
    const rules = {
      email: 'required|email',
      password: 'required|string',
    };

    const message = {
      required: 'This {{field}} field is required.',
      'email.email': 'The eamil is invalid',

    };

    try {
      await validateAll(data, rules, message);

      const response = await Axios.post(`${config.apiUrl}/auth/login`, {
        email: data.email,
        password: data.password,
      });
      return response.data.data;
    } catch (errors) {
      const formattedErrors = {};
      if (errors.response && errors.response.status === 401) {
        // eslint-disable-next-line
        formattedErrors.email = 'Invalid Credential';
        return Promise.reject(formattedErrors);
      }
      errors.forEach(error => (formattedErrors[error.field] = error.message));
      return Promise.reject(formattedErrors);
    }
  }
}
