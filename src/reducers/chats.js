import {
  LOAD_CHATS_SUCCESS,
  LOAD_CHATS_FAILURE,
  // RESEND_CHAT_FAILURE,
  // RESEND_CHAT_SUCCESS,
  // REMOVE_CHAT_SUCCESS,
  // REMOVE_CHAT_FAILURE,
  ADD_CHAT_DRAWING,
  ADD_CHAT_SUCCESS,
  ADD_CHAT_FAILURE,
} from '../constant';

const chats = (state = [], action) => {
  switch (action.type) {
    case LOAD_CHATS_SUCCESS:
      return action.chats.map((item) => {
        item.sent = true;
        return item;
      });

    case ADD_CHAT_DRAWING:
      return [
        ...state,
        {
          _id: action.id,
          content: action.content,
          status: 'Sender',
          sent: true,
        },
      ];

    case ADD_CHAT_SUCCESS:
      return state.map((item) => {
        if (action.oldId === item._id) item._id = action.chat._id;
        return item;
      });

    case ADD_CHAT_FAILURE:
      return state.map((item) => {
        if (action.id === item._id) item.sent = false;
        return item;
      });

    // case RESEND_CHAT_SUCCESS:
    //   return state.map((item) => {
    //     if (action.oldId === item._id) {
    //       item._id = action.chat._id;
    //       item.sent = true;
    //     }
    //     return item;
    //   });

    // case REMOVE_CHAT_SUCCESS:
    //   return state.filter((item) => action.id !== item._id);

    // case REMOVE_CHAT_FAILURE:
    // case RESEND_CHAT_FAILURE:
    case LOAD_CHATS_FAILURE:
    default:
      return state;
  }
};

export default chats;
