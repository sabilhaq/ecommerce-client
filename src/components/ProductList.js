// import { useEffect, useCallback } from "react";
// import { useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { loadProduct } from "../actions";
import ProductItem from "./ProductItem";
import "./ProductList.scss";

export default function ProductList() {
  const products = [
    {
      id: 1,
      title: "Product Title",
      rate: 4,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      brand: "String",
      detail: "String",
      votes: "Int",
      quantity: "Int",
      price: 3990000,
      UserId: "String",
      photos: ["String"],
    },
    {
      id: 2,
      title: "Product Title",
      rate: 3,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      brand: "String",
      detail: "String",
      votes: "Int",
      quantity: "Int",
      price: 3990000,
      UserId: "String",
      photos: ["String"],
    },
    {
      id: 3,
      title: "Product Title",
      rate: 3,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      brand: "String",
      detail: "String",
      votes: "Int",
      quantity: "Int",
      price: 3990000,
      UserId: "String",
      photos: ["String"],
    },
    {
      id: 4,
      title: "Product Title",
      rate: 3,
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      brand: "String",
      detail: "String",
      votes: "Int",
      quantity: "Int",
      price: 3990000,
      UserId: "String",
      photos: ["String"],
    },
  ];

  // const { products } = useSelector(
  //   (state) => ({
  //     products: state.products,
  //   }),
  //   shallowEqual
  // );

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(loadProduct());
  // }, [dispatch]);

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
      sent={true}
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
