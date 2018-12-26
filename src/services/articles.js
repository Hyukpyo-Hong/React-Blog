import Axios from 'axios';

import { validateAll } from 'indicative';
import config from '../config';

export default class ArticleService {
  getArticleCategories = async () => {
    const categories = JSON.parse(localStorage.getItem('categories'));
    if (categories) {
      return categories;
    }
    const response = await Axios.get(`${config.apiUrl}/categories`);
    localStorage.setItem('categories', JSON.stringify(response.data.categories));
    return response.data.categories;
  }

  deleteArticle = async (id, token) => {
    await Axios.delete(`${config.apiUrl}/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  }

  getArticles = async (url = `${config.apiUrl}/articles`) => {
    const response = await Axios.get(url);
    return response.data.data;
  }

  getArticle = async (slug) => {
    const response = await Axios.get(`${config.apiUrl}/article/${slug}`);
    return response.data.data;
  }

 getUserArticles= async (token, url = `${config.apiUrl}/user/articles`) => {
   const response = await Axios.get(url, {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   });
   return response.data.data;
 }

  createArticle = async (data, token) => {
    try {
      if (!data.image) {
        return Promise.reject([{
          message: 'The image is required.',
        }]);
      }
      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',

      };
      const message = {
        required: 'The {{field}} is required',

      };
      await validateAll(data, rules, message);
      const image = await this.uploadToCloudinary(data.image);
      const response = await Axios.post(`${config.apiUrl}/articles`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (errors) {
      if (errors.response) {
        return Promise.reject(errors.response.data);
      }
      return Promise.reject(errors);
    }
  }

  updateArticle = async (data, article, token) => {
    let image;
    try {
      if (data.image) {
        image = await this.uploadToCloudinary(data.image);
      }
      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',

      };
      const message = {
        required: 'The {{field}} is required',

      };
      await validateAll(data, rules, message);

      const response = await Axios.put(`${config.apiUrl}/articles/${article.id}`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image ? image.secure_url : article.imageUrl,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (errors) {
      if (errors.response) {
        return Promise.reject(errors.response.data);
      }
      return Promise.reject(errors);
    }
  }

  uploadToCloudinary = async (image) => {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'tmc1pwiv');
    const response = await Axios.post('https://api.cloudinary.com/v1_1/dpmvvan2c/image/upload', form);


    return response.data;
  }
}
