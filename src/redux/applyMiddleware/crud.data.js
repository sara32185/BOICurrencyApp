import actions from "redux/actions";
import { parseString } from 'xml2js';

export const getData = ({ dispatch, getState }) => next => action => {
    if (action.type === "GET_DATA") {
        fetch(`https://edge.boi.gov.il/FusionEdgeServer/sdmx/v2/data/dataflow/BOI.STATISTICS/EXR/1.0/RER_USD_ILS?startperiod=${action.payload.period}&endperiod=${action.payload.startPeriod || new Date().toISOString().split('T')[0]}`)
            .then(res => res.text())
            .then(xmlString => parseString(xmlString, (err, result) => {
                if (err)
                    console.log('Error parsing XML:', err);
                else {
                    dispatch(actions.setData({
                        "key": action.payload.stateKey,
                        "value": result["message:StructureSpecificData"]["message:DataSet"][0]["Series"][0]
                    }))
                }
            })
            )
    }
    return next(action)
}










