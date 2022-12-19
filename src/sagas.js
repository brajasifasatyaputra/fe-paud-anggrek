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
  STUDENT_LOGIN,
  PROFILE_FULFILLMENT,
  UPLOAD_DOCUMENT,
  PAYMENT_FULFILLMENT,
  FETCH_STUDENT,
  UPLOAD_CERTIFICATE,
} from "./store/constants/index";
import {
  setArticle,
  setGallery,
  setTestimony,
  setTeacher,
  setAssessment,
  setStudent,
} from "./store/actions/index";
import {
  fetchArticle,
  fetchGallery,
  fetchTestimonies,
  fetchTeacher,
  fetchAssessment,
  sendAssessment,
  studentRegister,
  studentLogin,
  profileFulfillment,
  uploadDocument,
  paymentFulfillment,
  fetchStudent,
  uploadCertificate,
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
      yield put(setTestimony(testimonies.reverse()))
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
      yield put(setAssessment(assessments.reverse()))
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
      const response = yield call(fetchAssessment);
      if (response) {
        const { assessments } = response.data;
        yield put(setAssessment(assessments.reverse()))
      }
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

function* loginAccount({ studentData, cb, scSuccess, isStudent }) {
  try {
    const response = yield call(studentLogin, studentData, isStudent);
    localStorage.setItem('access_token', response?.access_token);
    localStorage.setItem('role', response?.role);
    scSuccess && scSuccess();
  } catch (error) {
    if (error.response.status === 401) {
      cb && cb(error.response.data.message);
    } else {
      cb && cb('Mohon Maaf Terjadi kesalahan pada Sistem, Silahkan Coba lagi');
    }
  }
}

function* doProfileFulfillment({ data, cbSuccess, cbFailed }) {
  try {
    const response = yield call(profileFulfillment, data)
    if (response) {
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

function* doUploadDocument({ data, cbSuccess, cbFailed }) {
  try {
    const response = yield call(uploadDocument, data)
    if (response) {
      cbSuccess && cbSuccess(response?.data?.kode_pembayaran);
    }
  } catch (error) {
    if (error.response.status === 400) {
      cbFailed && cbFailed(error.response.data.message);
    } else {
      cbFailed && cbFailed('Mohon Maaf Terjadi kesalahan pada Sistem, Silahkan Coba lagi');
    }
  }
}

function* doPaymentFulfillment({ data, cbSuccess, cbFailed }) {
  try {
    const response = yield call(paymentFulfillment, data)
    if (response) {
      cbSuccess && cbSuccess();
    }
  } catch (error) {
    if (error.response.status === 400) {
      console.log(error.response.data.message, '<<<< message');
      cbFailed && cbFailed(error.response.data.message);
    } else if (error.response.status === 404) {
      cbFailed && cbFailed('Mohon Maaf, Kode Pembayaran Anda Salah');
    } else {
      cbFailed && cbFailed('Mohon Maaf Terjadi kesalahan pada Sistem, Silahkan Coba lagi');
    }
  }
}

function* doFetchStudent() {
  try {
    const response = yield call(fetchStudent);
    if (response) {
      const { students } = response.data;
      yield put(setStudent(students))
    }
  } catch (e) {
    console.log(e)
  }
}

function* doUploadCertificate({ data, id, cbSuccess, cbFailed }) {
  try {
    const response = yield call(uploadCertificate, data, id)
    if (!_.isEmpty(response)) {
      const response = yield call(fetchStudent);
      if (response) {
        const { students } = response.data;
        yield put(setStudent(students))
      }
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
  yield takeLatest(STUDENT_LOGIN, loginAccount);
  yield takeLatest(PROFILE_FULFILLMENT, doProfileFulfillment);
  yield takeLatest(UPLOAD_DOCUMENT, doUploadDocument);
  yield takeLatest(PAYMENT_FULFILLMENT, doPaymentFulfillment);
  yield takeLatest(FETCH_STUDENT, doFetchStudent);
  yield takeLatest(UPLOAD_CERTIFICATE, doUploadCertificate);
}

// export default mySaga;
