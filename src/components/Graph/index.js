import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip } from 'recharts';
import DataHook from 'components/Hooks/data.hook';
import { useEffect, useState } from 'react';

const Graph = (props) => {
    const { selectedPeriod } = props;
    const { data } = DataHook();
    const [graphData, setGraphData] = useState(null)

    const mapData = () => {
        const tempGraphData = [];
        data.data[selectedPeriod] && data.data[selectedPeriod].Obs.map(item => {
            const [year, month, day] = item['$'].TIME_PERIOD.substring(0, 10).split('-');
            tempGraphData.push({ 'name': `${day}/${month}`, uv: item['$'].OBS_VALUE })
        })
        tempGraphData.length > 0 && setGraphData(tempGraphData);
    }

    useEffect(() => {
        mapData()
    }, [data.data[selectedPeriod], selectedPeriod])

    return (
        graphData && <LineChart
            width={graphData.length * 100}
            height={400}
            data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[3, 4]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        </LineChart>
    )
}

export default Graph;

