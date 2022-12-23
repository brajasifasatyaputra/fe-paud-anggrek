import _ from "lodash";
import request from "../utils/request";
const base_URL = "http://localhost:5000/api";
const student_API = `${base_URL}/student`;
const teacher_API = `${base_URL}/teacher`

const urls = {
  fetchArticle: "/article",
  fetchGallery: "/gallery",
  fetchTestimonies: "/testimony",
  fetchTeacher: "/teacher",
  fetchAssessment: "/assessment",
  sendAssessment: '/assessment/create',
  registerStudent: `${student_API}/register`,
  loginStudent: `${student_API}/login`,
  loginTeacher: `${teacher_API}/login`,
  profileFulfillment: `/student/profile-fulfillment`,
  uploadDocument: '/student/upload-docs',
  paymentFulfillment: '/payment/fulfillment',
  fetchStudent: '/student',
  uploadCertificate: '/teacher/upload-certificate',
  getProfileStudent: '/student/get-profile',
  getProfileTeacher: '/teacher/get-profile',
  postTestimony: '/testimony/create'
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

export const fetchTeacher = () => {
  return callAPI(urls.fetchTeacher, "get", {});
};

export const fetchAssessment = () => {
  return callAPI(urls.fetchAssessment, "get", {});
};

export const sendAssessment = (assessment, id) => {
  return callAPI(`${urls.sendAssessment}/${id.id_guru}`, "post", {}, {}, assessment);
};

export const studentRegister = (data) => {
  return callAPI(urls.registerStudent, 'post', {}, {}, data)
};

export const studentLogin = (studentData, isStudent) => {
  return callAPI(isStudent ? urls.loginStudent : urls.loginTeacher, 'post', {}, {}, studentData)
};

export const profileFulfillment = (data) => {
  return callAPI(urls.profileFulfillment, 'post', {}, {}, data)
}
export const uploadDocument = (data) => {
  return callAPI(urls.uploadDocument, 'post', {}, {}, data)
}
export const paymentFulfillment = (data) => {
  return callAPI(urls.paymentFulfillment, 'post', {}, {}, data)
}
export const fetchStudent = () => {
  return callAPI(urls.fetchStudent, 'get', {})
}

export const uploadCertificate = (data, id) => {
  return callAPI(`${urls.uploadCertificate}/${id}`, 'post', {}, {}, data)
}

export const getProfileStudent = () => {
  return callAPI(urls.getProfileStudent, 'get', {})
}

export const getProfileTeacher = () => {
  return callAPI(urls.getProfileTeacher, 'get', {})
}

export const postTestimony = (data) => {
  return callAPI(urls.postTestimony, 'post', {}, {}, data);
}
