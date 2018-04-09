
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { getData, loadData } from "./utils"

// import { TypeChooser } from "react-stockcharts/lib/helper";


class ChartComponent extends React.Component {
	componentDidMount() {
		loadData().then(data=>{
			this.setState({ data })
			console.log(data);
		});
// 		getData().then(data => {
// // console.log(data);
// 			this.setState({ data })
// 		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			// <TypeChooser>
			// 	{type => <Chart type={type} data={this.state.data} />}
			// </TypeChooser>
			<Chart type='svg' data={this.state.data} />
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);
