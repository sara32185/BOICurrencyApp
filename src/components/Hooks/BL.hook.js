const BL = () => {

    const getTodayMinusParm = (minus) => {
        const today = new Date();
        const previousDay = new Date(today);
        const day = new Date(previousDay).getDay();
        switch (day) {
            case 0: {
                previousDay.setDate(today.getDate() - 2);
                break
            }
            case 1: {
                previousDay.setDate(today.getDate() - 3);
                break
            }
            default:
                previousDay.setDate(today.getDate() - minus);
        }
        return previousDay.toISOString().split('T')[0];

    };

    const getLastMonthDate = () => {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1);
        const dayOfMonth = today.getDate() + 1;
        lastMonth.setDate(dayOfMonth);
        return lastMonth.toISOString().split('T')[0];;
    };

    const getLastFewMonthsDate = (months) => {
        const today = new Date();
        const lastSixMonths = new Date(today.getFullYear(), today.getMonth() - months, today.getDate());
        return lastSixMonths.toISOString().split('T')[0];
    };

    return { getTodayMinusParm, getLastMonthDate, getLastFewMonthsDate }
}

export default BL;