import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
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
    .then((response) => response.data.getProducts)
    .catch((err) => {
      throw err;
    });
};

export const loadProduct = (id) => {
  const GET_PRODUCT = gql`
    query getProduct($id: Int!) {
      getProduct(id: $id) {
        id
        title
        brand
        votes
        price
        detail
        createdAt
        updatedAt
      }
    }
  `;
  return client
    .query({
      query: GET_PRODUCT,
      variables: { id },
    })
    .then((response) => response.data.getProduct)
    .catch((err) => {
      throw err;
    });
};

export const addProduct = (payload) => {
  const {
    title,
    rate,
    description,
    brand,
    detail,
    quantity,
    price,
    // UserId,
    photos,
  } = payload;
  const ADD_PRODUCT = gql`
    mutation createProduct(
      $title: String!
      $rate: Int!
      $description: String
      $brand: String
      $detail: String
      $votes: Int!
      $quantity: Int!
      $price: Int!
      $UserId: String!
      $photos: [String]
    ) {
      createProduct(
        input: {
          title: $title
          rate: $rate
          description: $description
          brand: $brand
          detail: $detail
          votes: $votes
          quantity: $quantity
          price: $price
          UserId: $UserId
          photos: $photos
        }
      ) {
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
  client
    .mutate({
      mutation: ADD_PRODUCT,
      variables: {
        title,
        rate,
        description,
        brand,
        detail,
        votes: 0,
        quantity,
        price,
        UserId: 'abc',
        photos,
      },
    })
    .then((response) => response.data.createProduct)
    .catch((err) => {
      throw err;
    });
};
