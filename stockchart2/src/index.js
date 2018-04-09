
import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import { loadData, getData } from "./utils"

import { TypeChooser } from "react-stockcharts/lib/helper";


class ChartComponent extends React.Component {
	componentDidMount() {
		// getData().then(data => {
		// 	console.log(data);
		// });
		loadData().then(data => {
			console.log(data);
			this.setState({ data })
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<Chart data={this.state.data} />
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);
