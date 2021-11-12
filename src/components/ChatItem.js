import React, { useState, useEffect, useRef } from "react";
import marked from "marked";

export default function ChatItem(props) {
  const [isHover, setIsHover] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState(props.content);

  const editInput = useRef(null)

  useEffect(() => {
    editInput.current?.focus()
  }, [isEdit])

  const handleIsEdit = () => {
    setIsEdit(!isEdit)
  }

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const onEnterPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    props.edit(props.id, content, props.receiver, props.room, props.socket);
    setContent(content);
    setIsEdit(!isEdit);
    event.preventDefault();
  };

  return (
    <div className={props.status}>
      {!props.sent && (
        <svg
          onClick={() => props.resend(props.id, props.content, props.receiver)}
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-rotate-clockwise-2"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 4.55a8 8 0 0 1 6 14.9m0 -4.45v5h5"></path>
          <line x1="5.63" y1="7.16" x2="5.63" y2="7.17"></line>
          <line x1="4.06" y1="11" x2="4.06" y2="11.01"></line>
          <line x1="4.63" y1="15.1" x2="4.63" y2="15.11"></line>
          <line x1="7.16" y1="18.37" x2="7.16" y2="18.38"></line>
          <line x1="11" y1="19.94" x2="11" y2="19.95"></line>
        </svg>
      )}

      {props.sent && isHover && !isEdit && props.status === "Chat Sender" && (
        <React.Fragment>
          <svg
            onClick={() => handleIsEdit(!isEdit)}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-edit"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="#FFA500"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3"></path>
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3"></path>
            <line x1="16" y1="5" x2="19" y2="8"></line>
          </svg>
          <svg
            onClick={() => props.remove(props.id, props.receiver, props.room, props.socket)}
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-trash"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="red"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="4" y1="7" x2="20" y2="7"></line>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </React.Fragment>
      )}

      {!isEdit ? (
        <div
          className="Bubble"
          onClick={() => {
            setIsHover(!isHover);
          }}
        >
          <p style={{ overflowWrap: "break-word" }} dangerouslySetInnerHTML={{ __html: marked(content) }}></p>
        </div>
      ) : (
        <div
          className="Bubble"
          onClick={() => {
            setIsHover(!isHover);
          }}
          onBlur={handleSubmit}
        >
          <form>
            <input
              ref={editInput}
              value={content}
              className="form-control"
              style={{ overflowWrap: "break-word" }}
              onChange={handleChange}
              onKeyDown={onEnterPress}
            ></input>
          </form>
        </div>
      )}
    </div>
  );
}
