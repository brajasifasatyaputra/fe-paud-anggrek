import _ from "lodash";
import request from "../utils/request";
const base_URL = "http://localhost:5000/api";

const urls = {
  fetchArticle: "/article",
  fetchGallery: "/gallery",
  fetchTestimonies: "/testimony",
};

const callAPI = (endpoint, method, headers = {}, params = {}, data = {}) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    const defaultHeaders = {
      Authorization: `Bearer ${access_token}`,
    };
  
    _.extend(headers, defaultHeaders);
  }
  const options = {
    baseURL: base_URL,
    url: endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const fetchArticle = () => {
  return callAPI(urls.fetchArticle, "get", {});
};

export const fetchGallery = () => {
  return callAPI(urls.fetchGallery, "get", {});
};

export const fetchTestimonies = () => {
  return callAPI(urls.fetchTestimonies, "get", {});
};
