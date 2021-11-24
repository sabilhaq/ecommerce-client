import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import rootReducer from './reducers';
import rootSaga from './sagas';
import ProductBox from './components/ProductBox';
import ProductForm from './components/ProductForm';
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import ChatView from './components/ChatView';
import './App.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router forceRefresh={true}>
        <Switch>
          <Route path="/add" component={ProductForm} />
          <Route path="/chats" component={ChatView} />
          <Route path="/detail/:id" component={ProductDetail} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={ProductBox} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
