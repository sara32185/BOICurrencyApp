import React, { useEffect, useState } from 'react';
import DataHook from "components/Hooks/data.hook";
import ChoosePeriodType from 'components/Graph/ChoosePeriodType';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const CurrencyTable = () => {

    const { getData, data } = DataHook()

    const getPreviousDate = () => {
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
                previousDay.setDate(today.getDate() - 1);
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

    const currencyTableStruct = [
        {
            colName: "Currency Name",
            value: 'Dolar',
        },
        {
            colName: "Currency Id",
            value: 'USD',

        },
        {
            colName: "Previous Day Rate",
            endPeriod: getPreviousDate(),
            stateKey: 'previosDayData',
            startPriod: getPreviousDate()
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
        return values ? <p>{values.join(', ')}</p> : <p>no data</p>
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
            <TableContainer component={Paper} sx={{ maxWidth: 650, margin: 'auto' }}>
                <Table sx={{ maxWidth: 650 }} aria-label="simple table">
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