import React from 'react';
import { PieChart } from '@mui/x-charts';
import { Grid, Typography, Box } from '@mui/material';

function GraficoMUI({ v1, v2, v3, v4, n1, n2, n3, n4, c1, c2, c3, c4 }) {
    const data = [
        { id: 0, value: v1, label: n1, color: c1 },
        { id: 1, value: v2, label: n2, color: c2 },
        { id: 2, value: v3, label: n3, color: c3 },
        { id: 3, value: v4, label: n4, color: c4 },
    ];

    return (
        <Grid container justifyContent="center" alignItems="center">
            <Grid item>
                <PieChart
                  margin={{left:100 }}
                      slotProps={{
                        legend: {
                          direction: 'row',
                          position: { vertical: 'top', horizontal: 'middle' },
                          padding: 0,
                            hidden:true,
                        },
                      }}
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
                            data: data,
                        },
                    ]}
                    height={165}
                    width={256} // Ajuste o tamanho conforme necessário
                />
            </Grid>
            <Grid item>
                <Grid container direction="column" alignItems="stretch">
                    {data.map((item) => (
                        <Grid item key={item.id}>
                            <Box display="flex" >
                                <Box
                                    style={{
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: item.color,
                                        marginRight: '8px',
                                    }}
                                />
                                <Typography>{item.label}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default GraficoMUI;
