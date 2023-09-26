import React, { useEffect, useState } from 'react';
import DataHook from "components/Hooks/data.hook";
import BL from 'components/Hooks/BL.hook';
import ChoosePeriodType from 'components/Graph/ChoosePeriodType';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CurrencyTable = () => {

    const { getData, data, currentCurrency } = DataHook()
    const { getLastFewMonthsDate, getLastMonthDate, getTodayMinusParm } = BL();


    const currencyTableStruct = [
        {
            colName: "Currency Name",
            value: currentCurrency.currencyName,
        },
        {
            colName: "Currency Id",
            value: currentCurrency.currencyID,
        },
        {
            colName: "Previous Day Rate",
            endPeriod: getTodayMinusParm(1),
            stateKey: 'previosDayData',
            startPriod: getTodayMinusParm(1)
        },
        {
            colName: "Previos Week Rate",
            endPeriod: getTodayMinusParm(6),
            stateKey: 'previosWeekData',
        },
        {
            colName: "Previous Month Rate",
            endPeriod: getLastMonthDate(),
            stateKey: 'lastMonthData',
        },
        {
            colName: "Rate in 6 months",
            endPeriod: getLastFewMonthsDate(6),
            stateKey: 'sixMonthData',
        },
        {
            colName: "Rate in 12 months",
            endPeriod: getLastFewMonthsDate(12),
            stateKey: 'yearData',
        },
    ]

    const joinRates = (currency) => {
        let values = null;
        if (data.data[currency.stateKey]) {
            values = data.data[currency.stateKey].Obs.map(item => item['$']['OBS_VALUE'])
        }
        return values ? <p>{values.join(', ')}</p> : <p>no information</p>
    }

    const displayTableFunc = () => {
        return <TableRow>{currencyTableStruct.map(currency =>
            <TableCell>
                {
                    currency.value ?
                        currency.value :
                        currency.endPeriod && joinRates(currency)
                }
            </TableCell>
        )}
        </TableRow>
    }

    const populateData = async () => {
        await currencyTableStruct.map(currency => {
            currency.endPeriod && getData({
                'period': currency.endPeriod,
                'stateKey': currency.stateKey,
                'mapData': currency.mapData,
                'startPeriod': currency.startPriod || null
            })
        })
    }


    useEffect(() => {
        // Interval in milliseconds (24 hours)
        const interval = 24 * 60 * 60 * 1000;
        // Run saveData function initially when component mounts
        populateData();
        // Set interval to run saveData function once a day
        const intervalId = setInterval(populateData, interval);
        // Clean up interval on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <>
            <TableContainer component={Paper} sx={{ maxWidth: 700, margin: 'auto' }}>
                <Table sx={{ maxWidth: 700 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {currencyTableStruct.map(currency =>
                                <TableCell>
                                    {currency.colName}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayTableFunc()}
                    </TableBody>
                </Table >
            </TableContainer >
            <ChoosePeriodType />
        </>
    );
};

export default CurrencyTable;