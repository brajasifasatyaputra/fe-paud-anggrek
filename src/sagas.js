import { call, put, takeLatest } from "redux-saga/effects";
import { omit } from 'lodash';
import { 
  FETCH_ARTICLE,
  FETCH_GALLERY,
  FETCH_TESTIMONY,
  FETCH_TEACHER,
  FETCH_ASSESSMENT,
  SEND_ASSESSMENT,
  STUDENT_REGISTER,
} from "./store/constants/index";
import {
  setArticle,
  setGallery,
  setTestimony,
  setTeacher,
  setAssessment,
} from "./store/actions/index";
import {
  fetchArticle,
  fetchGallery,
  fetchTestimonies,
  fetchTeacher,
  fetchAssessment,
  sendAssessment,
  studentRegister,
} from "./domain/API";
import _ from "lodash";
// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* doFetchArticle() {
  try {
    const response = yield call(fetchArticle);
    if (response) {
      const { articles } = response.data;
      const activity = articles.filter((item) => {
        return item.category.toLowerCase() === 'kegiatan'
      })
      const achievment = articles.filter((item) => {
        return item.category.toLowerCase() === 'prestasi'
      })
      yield put(setArticle(activity, achievment))
    }
  } catch (e) {
    console.log(e)
    // yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}

function* doFetchGallery() {
  try {
    const response = yield call(fetchGallery);
    if (response) {
      const { galleries } = response.data;
      yield put(setGallery(galleries))
    }
  } catch (e) {
    console.log(e)
  }
}

function* doFetchTestimony() {
  try {
    const response = yield call(fetchTestimonies);
    if (response) {
      const { testimonies } = response.data;
      yield put(setTestimony(testimonies))
    }
  } catch (e) {
    console.log(e)
  }
}

function* doFetchTeacher() {
  try {
    const response = yield call(fetchTeacher);
    if (response) {
      const { teachers } = response.data;
      yield put(setTeacher(teachers))
    }
  } catch (e) {
    console.log(e)
  }
}

function* doFetchAssessments() {
  try {
    const response = yield call(fetchAssessment);
    if (response) {
      const { assessments } = response.data;
      yield put(setAssessment(assessments))
    }
  } catch (e) {
    console.log(e)
  }
}

function* doSendAssessment({ data, cbSuccess, cbFailed }) {
  try {
    const assessment = _.omit(data, ['id_guru']);
    const id_guru = _.pick(data, ['id_guru']);
    const response = yield call(sendAssessment, assessment, id_guru);
    if (!_.isEmpty(response)) {
      cbSuccess && cbSuccess()
    }
  } catch (e) {
    cbFailed && cbFailed();
  }
}

function* registAccount({ data, cbSuccess, cbFailed }) {
  try {
    const dataStudent = omit(data, ['retypePassword']);
    const newStudent = yield call(studentRegister, dataStudent);
    if (newStudent?.token && newStudent?.role) {
      localStorage.setItem('access_token', newStudent?.token);
      localStorage.setItem('role', newStudent?.role);
      cbSuccess && cbSuccess();
    }
  } catch (error) {
    if (error.response.status === 400) {
      cbFailed && cbFailed(error.response.data.message);
    } else {
      cbFailed && cbFailed('Mohon Maaf Terjadi kesalahan pada Sistem, Silahkan Coba lagi');
    }
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export default function* mySaga() {
  yield takeLatest(FETCH_ARTICLE, doFetchArticle);
  yield takeLatest(FETCH_GALLERY, doFetchGallery);
  yield takeLatest(FETCH_TESTIMONY, doFetchTestimony);
  yield takeLatest(FETCH_TEACHER, doFetchTeacher);
  yield takeLatest(FETCH_ASSESSMENT, doFetchAssessments);
  yield takeLatest(SEND_ASSESSMENT, doSendAssessment);
  yield takeLatest(STUDENT_REGISTER, registAccount);
}

// export default mySaga;
