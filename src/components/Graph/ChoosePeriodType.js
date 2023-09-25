import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Graph from 'components/Graph'

function CustomTabPanel(props) {
    const { children, value, tabProps, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box sx={{ p: 3 }}>
                <Graph selectedPeriod={tabProps.key} />
            </Box>
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};



const ChoosePeriodType = () => {
    const [value, setValue] = React.useState(0);

    const tabsStrct = [{
        id: 0,
        label: 'Last month',
        key: 'lastMonthData',
    },
    {
        id: 1,
        label: 'Six months',
        key: 'sixMonthData',
    },
    {
        id: 2,
        label: 'Year',
        key: 'yearData',
    },]


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabsStrct.map(tab =>
                        <Tab label={tab.label}  {...tab} />
                    )}
                </Tabs>
            </Box>
            <CustomTabPanel index={value} value={value} tabProps={tabsStrct[value]} />

        </Box>
    );
}
export default ChoosePeriodType;