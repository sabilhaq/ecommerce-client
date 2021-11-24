import { put, call } from 'redux-saga/effects';
import { v4 as uuidv4 } from 'uuid';
import * as actions from '../actions';
import * as GraphQL from '../services/graphql';

export function* loadChats({ param }) {
  try {
    const chats = yield call(GraphQL.loadChats, param);
    yield put(actions.loadChatsSuccess(chats));
  } catch (error) {
    console.log(error);
    yield put(actions.loadChatsFailure());
  }
}

export function* addChat({ input }) {
  const id = uuidv4();
  try {
    yield put(actions.drawAddChat(id, input.content));
    const chat = yield call(GraphQL.addChat, input);
    yield put(actions.addChatSuccess(id, chat));
  } catch (error) {
    yield put(actions.addChatFailure(id));
  }
}
