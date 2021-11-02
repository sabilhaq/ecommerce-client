import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
});

export const loadProducts = () => {
  const GET_PRODUCTS = gql`
    {
      getProducts {
        id
        title
        rate
        description
        price
        createdAt
        updatedAt
      }
    }
  `;
  return client
    .query({ query: GET_PRODUCTS })
    .then((response) => {
      return response.data.getProducts;
    })
    .catch((err) => {
      throw err;
    });
};

// export const addProduct = (title) => {
//   const ADD_PRODUCT = gql`
//     mutation createProduct($title: String) {
//       createProduct(input: { title: $title }) {
//         _id
//         title
//         complete
//       }
//     }
//   `;
//   client
//     .mutate({ mutation: ADD_PRODUCT, variables: { title } })
//     .then((response) => response.data.createProduct)
//     .catch((err) => {
//       throw err;
//     });
// };
