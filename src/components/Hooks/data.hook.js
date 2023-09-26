import { useDispatch, useSelector } from 'react-redux';
import actions from 'redux/actions';

const DataHook = () => {

    const dispatch = useDispatch();
    const getData = (action) => dispatch(actions.getData(action))
    const data = useSelector(state => state.DataReducer)
    const currentCurrency = useSelector(state => state.DataReducer.currency)


    return { getData, data, currentCurrency };
}

export default DataHook;