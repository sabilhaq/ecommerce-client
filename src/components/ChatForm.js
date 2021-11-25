import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { addChat } from '../actions';

export default function ChatForm(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [content, setContent] = useState(location.state?.order);

  const handleChange = (event) => {
    event.target.style.height = '5px';
    event.target.style.height = event.target.scrollHeight + 'px';

    setContent(event.target.value);
  };

  const onEnterPress = (event) => {
    if (event.keyCode === 13 && event.shiftKey === false) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSubmit = (event) => {
    dispatch(
      addChat({
        content,
        sender: localStorage.getItem('email'),
        receiver: location.state.receiver,
      })
    );
    setContent('');
    event.preventDefault();
  };

  return (
    <div className='NewChat'>
      <form onSubmit={handleSubmit} className='NewChatForm'>
        <textarea
          onChange={handleChange}
          onKeyDown={onEnterPress}
          className='form-control'
          id='inputChat'
          rows='1'
          placeholder='Write your chat here...'
          value={content}
          disabled={!props.receiver && !location.state.receiver}
        ></textarea>

        <button className='Send'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='icon icon-tabler icon-tabler-send'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            strokeWidth='2'
            stroke='white'
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
            <line x1='10' y1='14' x2='21' y2='3'></line>
            <path d='M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5'></path>
          </svg>
        </button>
      </form>
    </div>
  );
}
