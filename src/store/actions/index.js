import {
  HELLO_WORLD,
  RECEIVE_HELLO_WORLD,
  POST_CONTACT,
  FETCH_ARTICLE,
  SET_ARTICLE,
  FETCH_GALLERY,
  SET_GALLERY,
} from "../constants/index";

export const requestHelloWorld = () => {
  return {
    type: HELLO_WORLD,
  };
};
export const receiveHelloWorld = (text) => {
  return {
    type: RECEIVE_HELLO_WORLD,
    text,
  };
};
export const submitContact = (value) => {
  return {
    type: POST_CONTACT,
    value,
  };
};

export const fetchArticle = () => {
  return {
    type: FETCH_ARTICLE,
  }
}

export const setArticle = (activity, achievment) => {
  return {
    type: SET_ARTICLE,
    activity,
    achievment
  }
}

export const fetchGallery = () => {
  return {
    type: FETCH_GALLERY,
  }
}

export const setGallery = (galleries) => {
  return {
    type: SET_GALLERY,
    galleries,
  }
}