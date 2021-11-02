import { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { loadProduct } from "../actions";
import ProductItem from "./ProductItem";
import "./ProductList.scss";

export default function ProductList() {
  const { products } = useSelector(
    (state) => ({
      products: state.products,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct());
  }, [dispatch]);

  // const resend = useCallback(
  //   (id, title) => {
  //     dispatch(resendProduct(id, title));
  //   },
  //   [dispatch]
  // );

  // const remove = useCallback(
  //   (id) => {
  //     dispatch(removeProduct(id));
  //   },
  //   [dispatch]
  // );

  const nodeList = products.map((item) => (
    <ProductItem
      key={item.id}
      id={item.id}
      title={item.title}
      sent={item.sent}
      rate={item.rate}
      description={item.description}
      price={item.price}
      UserId={item.UserId}
      // resend={() => resend(item._id, item.title)}
      // remove={() => remove(item._id)}
    />
  ));

  return <div className="ProductList">{nodeList}</div>;
}
