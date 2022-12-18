import {
  HELLO_WORLD,
  RECEIVE_HELLO_WORLD,
  POST_CONTACT,
  FETCH_ARTICLE,
  SET_ARTICLE,
  FETCH_GALLERY,
  SET_GALLERY,
  FETCH_TESTIMONY,
  SET_TESTIMONY,
  FETCH_TEACHER,
  SET_TEACHER,
  FETCH_ASSESSMENT,
  SET_ASSESSMENT,
  SEND_ASSESSMENT,
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

export const fetchTestimony = () => {
  return {
    type: FETCH_TESTIMONY,
  }
}

export const setTestimony = (testimonies) => {
  return {
    type: SET_TESTIMONY,
    testimonies,
  }
}

export const fetchTeacher = () => {
  return {
    type: FETCH_TEACHER,
  }
}

export const setTeacher = (teachers) => {
  return {
    type: SET_TEACHER,
    teachers,
  }
}

export const fetchAssessment = () => {
  return {
    type: FETCH_ASSESSMENT,
  }
}

export const setAssessment = (assessments) => {
  return {
    type: SET_ASSESSMENT,
    assessments,
  }
}

export const submitAssessment = (data, cbSuccess, cbFailed) => {
  return {
    type: SEND_ASSESSMENT,
    data,
    cbSuccess,
    cbFailed
  }
}