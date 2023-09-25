import React, { useEffect } from 'react';
import DataHook from 'components/Hooks/data.hook';

const SaveDataOnceADay = () => {
    const { data } = DataHook();

    useEffect(() => {
        const saveData = () => {
            Object.keys(data.data).map(item => {
                localStorage.setItem([item], JSON.stringify(data.data[item]))
            })
        };

        // Interval in milliseconds (24 hours)
        const interval = 24 * 60 * 60 * 1000;

        // Run saveData function initially when component mounts
        saveData();

        // Set interval to run saveData function once a day
        const intervalId = setInterval(saveData, interval);

        // Clean up interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        null
    );
};

export default SaveDataOnceADay;