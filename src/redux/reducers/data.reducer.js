import produce from 'immer';
import createReducer from './reducerUtils';

const initialState = {
    data: {
        previosDayData: null,
        lastMonthData: null,
        sixMonthData: null,
        yearData: null,
    }
}

const datesByMonth = (lastYearDates) => {
    const today = new Date().getDate();

    const datesByMonth = lastYearDates.reduce((accumulator, dateObj) => {
        const month = new Date(dateObj['$'].TIME_PERIOD).toLocaleString('en-US', { month: 'long' });

        if (accumulator.hasOwnProperty(month)) {
            accumulator[month].push(dateObj['$']);
        } else {
            accumulator[month] = [dateObj['$']];
        }

        return accumulator;
    }, {});

    let datesArr = [];

    Object.keys(datesByMonth).map((month) => {
        for (let i = 0; i < datesByMonth[month].length; i++) {
            if (new Date(datesByMonth[month][i].TIME_PERIOD).getDate() == today) {
                datesArr.push({ '$': datesByMonth[month][i] })
                break;
            }
            else if (new Date(datesByMonth[month][i].TIME_PERIOD).getDate() > today) {
                if (i == 0)
                    continue;
                else {
                    let tempDate = new Date(datesByMonth[month][i - 1].TIME_PERIOD);
                    tempDate.setDate(today)
                    let temp = { ...datesByMonth[month][i - 1], ['TIME_PERIOD']: tempDate }
                    datesArr.push({ '$': JSON.parse(JSON.stringify(temp)) })
                }
                break;
            }
        }
    })
    return { 'Obs': datesArr };
}

const daysInMonth = (lastMonthData) => {
    let month = new Date().getMonth() - 1;
    let year = new Date().getFullYear();
    let numDaysInMonth = new Date(year, month, 0).getDate();
    let daysInMonthArr = []
    let prev = lastMonthData[0];
    for (let i = 0; i < lastMonthData.length; i++) {
        let tempDate = new Date(lastMonthData[i]['$'].TIME_PERIOD).getDate();
        let prevDate = new Date(prev['$'].TIME_PERIOD).getDate();
        if (prevDate == numDaysInMonth)
            prevDate = 1;
        if (tempDate - prevDate > 1) {
            let addDay = new Date(prev['$'].TIME_PERIOD);
            while (new Date(addDay).getDate() + 1 < tempDate) {

                addDay.setDate(addDay.getDate() + 1)
                let temp = { ...prev['$'], ['TIME_PERIOD']: addDay }
                daysInMonthArr.push({ '$': JSON.parse(JSON.stringify(temp)) })

            }
        }
        daysInMonthArr.push(lastMonthData[i]);
        prev = lastMonthData[i];

    }
    return { 'Obs': daysInMonthArr };
}



const data = {
    setData(state, action) {
        const { key, value } = action.payload;
        let datesArr = []
        let daysInMonthArr = []
        switch (key) {
            case 'sixMonthData': {
                datesArr = datesByMonth(value.Obs)
                break;
            }
            case 'yearData': {
                datesArr = datesByMonth(value.Obs)
                break;
            }
            case 'lastMonthData': {
                daysInMonthArr = daysInMonth(value.Obs)
            }
            default: break;
        }

        state.data = {
            ...state.data,
            [key]:
                datesArr?.Obs ? datesArr
                    : daysInMonthArr?.Obs ? daysInMonthArr
                        : value
        }
    },

}

export default produce((state, action) =>
    createReducer(state, action, data), initialState);