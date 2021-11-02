import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import rootReducer from './reducers';
import rootSaga from './sagas/products';
import ProductBox from './components/ProductBox';
import ProductForm from './components/ProductForm';
import './App.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/add">
            <ProductForm />
          </Route>
          <Route exact path="/">
            <ProductBox />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
