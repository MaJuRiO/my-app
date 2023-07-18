
import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Box } from '@chakra-ui/react';

ChartJS.register(ArcElement, Legend);

const PieChartExample = ({ soc }: { soc: any }) => {
    const data = {
        datasets: [{
            label: 'Status',
            data: [`${soc}`, 100 - soc],
            backgroundColor: ['#5BC236', 'gray'],
            hoverBackgroundColor: ['#5BC236', 'gray'],
            hoverOffset: 4
        }],
    };
    return (
        
            <Doughnut
                data={data} />
        
    )
};




export default PieChartExample;