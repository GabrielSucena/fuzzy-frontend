// Grafico.js
import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Grafico extends Component {
    constructor(props) {
        super(props);
        this.chart = React.createRef();
        this.options = props.options;
        this.visitorsChartDrilldownHandler = this.visitorsChartDrilldownHandler.bind(this);
    }

    visitorsChartDrilldownHandler(e) {
        const chart = this.chart.current.chart;
        chart.options = this.props.drilldownOptions;
        chart.options.data = this.options[e.dataPoint.name];
        chart.options.title = { text: e.dataPoint.name };
        chart.render();
        document.getElementById("backButton").classList.remove("invisible");
    }

    componentDidMount() {
        const chart = this.chart.current.chart;
        chart.options = this.props.initialOptions;
        chart.options.data = this.options["New vs Returning Visitors"];
        chart.render();
        
        document.getElementById("backButton").addEventListener('click', () => {
            document.getElementById("backButton").classList.add("invisible");
            chart.options = this.props.initialOptions;
            chart.options.data = this.options["New vs Returning Visitors"];
            chart.render();
        });
    }

    render() {
        return (
            <div>
                <CanvasJSChart options={this.options} onRef={ref => this.chart.current = ref} />
                <button className="btn invisible" id="backButton" style={this.props.buttonStyle}>&lt; Back</button>
            </div>
        );
    }
}

export default Grafico;
