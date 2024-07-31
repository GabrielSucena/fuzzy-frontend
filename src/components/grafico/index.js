import React from 'react';
import { PieChart } from '@mui/x-charts';

function Grafico(props) {
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
                    startAngle: 0,
                    endAngle: 360,
                    data: [
                        { id: 0, value: 25, label: 'Curso Realizado' },
                        { id: 1, value: 25, label: 'Ccurso Não Realizado' },
                        { id: 2, value: 25, label: 'Curso Não Realizado' },
                        { id: 3, value: 25, label: 'Curso Não Realizado' },
                    ],
                },
            ]}
            width={500}
            height={150}
        />
    );
}

export default Grafico;
