import {
    createStore,
    applyMiddleware
} from 'redux';

import appReducers from './reducers/appReducers';

import {
    getData
} from './applyMiddleware/crud.data';

const store = createStore(
    appReducers,
    applyMiddleware(
        getData
    )
)

export default store;