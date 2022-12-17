import { call, put, takeLatest } from "redux-saga/effects";
import { 
  FETCH_ARTICLE,
  FETCH_GALLERY,
  FETCH_TESTIMONY,
} from "./store/constants/index";
import {
  setArticle,
  setGallery,
  setTestimony,
} from "./store/actions/index";
import {
  fetchArticle,
  fetchGallery,
  fetchTestimonies,
} from "./domain/API";
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
}

// export default mySaga;
