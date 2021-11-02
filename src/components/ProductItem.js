import "./ProductItem.scss";

export default function ProductItem(props) {
  let star = [];
  for (let i = 0; i < 5; i++) {
    star.push(
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-star"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeWidth="1"
        stroke="currentColor"
        fill={i < props.rate ? "black" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
      </svg>
    );
  }

  return (
    <div className="ProductItem">
      <div className="CardBody">
        <div
          className="Photo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          500 x 400
        </div>
        <div className="Title">{props.title}</div>
        <div className="Rate">{star}</div>
        <div className="Description">{props.description}</div>
        <div className="Price">Rp{props.price.toLocaleString("id-ID")}</div>
        {/* <div>{props.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div> */}
      </div>
      <div className="CardFooter">
        <button className="btn-detail">DETAIL ITEM</button>
      </div>
    </div>
  );
}
