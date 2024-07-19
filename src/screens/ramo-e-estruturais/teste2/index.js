// ./screens/ramo-e-estruturais/teste2.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

class Teste2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: [44, 55, 41, 17],
      options: {
        chart: {
          type: 'donut',
        },
        plotOptions: {
          pie: {
            startAngle: 0,
            endAngle: 360,
          },
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          type: 'gradient',
        },
        legend: {
          show: true,
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '10px',
          itemMargin: {
            horizontal: 5,
            vertical: 2,
          },
          formatter: function (val, opts) {
            const labels = ['Curso realizado', 'Curso não realizado', 'Curso não realizado', 'Curso não realizado'];
            return labels[opts.seriesIndex] + ' - ' + opts.w.globals.series[opts.seriesIndex];
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: '100%',
              },
              legend: {
                position: 'bottom',
                fontSize: '10px',
              },
            },
          },
        ],
      },
    };
  }

  render() {
    return (
      <div className='conteiner=grafico'>
        <div className='grafico'>
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type='donut'
            width='100%'
          />
        </div>
      </div>
    );
  }
}

export default Teste2;
