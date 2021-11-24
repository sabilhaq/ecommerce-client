export default function ContactItem(props) {
  const handleClick = (event) => {
    props.getChat(props.email);
  };
  return (
    <div onClick={handleClick} className={props.style}>
      {props.email}
    </div>
  );
}
