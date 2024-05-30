import { AxiosResponse } from "axios";
import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { getPostAPI } from "./Api";
import { getAllPost, getAllPostFailure } from "./slice/slicePost";
import { Post } from "./type";

function* getPost() {
  try {
    const response: AxiosResponse<Post[]> = yield call(getPostAPI);
    yield put(getAllPost(response));
  } catch (error) {
    console.log(error);
    yield put(getAllPostFailure());
  }
}

export function* getPostSaga() {
  yield takeEvery("post/getPostStart", getPost);
}

export default function* rootSaga() {
  yield all([fork(getPostSaga)]);
}
