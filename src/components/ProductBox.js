import { BrowserRouter as Router, Link } from "react-router-dom";
import ProductList from "./ProductList";
import "./ProductBox.scss";

export default function ProductBox() {
  return (
    <Router>
      <div className="ProductBox">
        <Link to="/add" className="btn-add">
          Add Ads
        </Link>

        <ProductList />

        <div>{/*Todo: Pagination */}</div>
      </div>
    </Router>
  );
}
