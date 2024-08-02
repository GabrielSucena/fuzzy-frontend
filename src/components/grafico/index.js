import React from 'react';
import { PieChart } from '@mui/x-charts';

function Grafico( { v1, v2, v3, v4, n1, n2, n3, n4, c1, c2, c3, c4 } ) {
    return (
        <PieChart
            series={[
                {
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    innerRadius: 50,
                    outerRadius: 60,
                    paddingAngle: 2,
                    cornerRadius: 5,
                    startAngle: 360,
                    endAngle: 0,
                    data: [
                        { id: 0, value: v1, label: n1, color: c1 },
                        { id: 1, value: v2, label: n2, color: c2 },
                        { id: 2, value: v3, label: n3, color: c3 },
                        { id: 3, value: v4, label: n4, color: c4 },
                    ],
                    
                },
            ]}
            width={500}
            height={150}
        />
    );
}

export default Grafico;


