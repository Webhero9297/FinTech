"use strict";
var { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } = ReStock;

var { CandlestickSeries, BarSeries, LineSeries, AreaSeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { EdgeIndicator } = coordinates;
var { CurrentCoordinate } = coordinates;

var { OHLCTooltip, MovingAverageTooltip, HoverTooltip } = tooltip;
var { XAxis, YAxis } = axes;
var { ema, sma } = indicator;
var { fitWidth, TypeChooser } = helper;

var dateFormat = d3.timeFormat("%Y-%m-%d %H:%M:%S");
var numberFormat = d3.format(".2f");

function tooltipContent(calculators) {
	
	return ({ currentItem, xAccessor }) => {
		return {
			x: dateFormat(xAccessor(currentItem)),
			y: [
				{ label: "open", value: currentItem.open && numberFormat(currentItem.open) },
				{ label: "high", value: currentItem.high && numberFormat(currentItem.high) },
				{ label: "low", value: currentItem.low && numberFormat(currentItem.low) },
				{ label: "close", value: currentItem.close && numberFormat(currentItem.close) },
			]
			.concat(calculators.map(each => ({
				label: each.tooltipLabel(),
				value: numberFormat(each.accessor()(currentItem)),
				stroke: each.stroke()
			})))
			.filter(line => line.value)
		};
	};
}

const keyValues = ["high", "low", "open"];

class CandleStickChartWithHoverTooltip extends React.Component {

	removeRandomValues(data) {
		return data.map((item) => {
			const numberOfDeletion = Math.floor(Math.random() * keyValues.length) + 1;
			for (let i = 0; i < numberOfDeletion; i += 1){
				const randomKey = keyValues[Math.floor(Math.random() * keyValues.length)];
				item[randomKey] = undefined;
			}
			return item;
		});
	}

	render() {
		var { data, type, width, ratio } = this.props;

		// remove some of the data to be able to see
		// the tooltip resize
		// data = this.removeRandomValues(data);

		var ema12 = ema()
			.id(0)
			.windowSize(12)
			.merge((d, c) => {d.ema12 = c;})
			.accessor(d => d.ema12);

		var ema26 = ema()
			.id(2)
			.windowSize(26)
			.merge((d, c) => {d.ema26 = c;})
			.accessor(d => d.ema26);

		var margin = { left: 80, right: 80, top: 30, bottom: 50 };

		return (
			<ChartCanvas ratio={ratio} height={400}
					width={width}
					margin={margin}
					type={type}
					seriesName="MSFT"
					data={data}
					calculator={[ema12, ema26]}
					xAccessor={d => d.date}
					xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[startdate, lastdate]}>

				<Chart id={1}
						yExtents={[d => [d.high, d.low], ema12.accessor(), ema26.accessor()]}
						padding={{ top: 10, bottom: 20 }}>
					<XAxis axisAt="bottom" orient="bottom"/>

					<YAxis axisAt="right" orient="right" ticks={5} />

					<CandlestickSeries />
					<LineSeries yAccessor={ema12.accessor()} stroke={ema12.stroke()}/>
					<LineSeries yAccessor={ema26.accessor()} stroke={ema26.stroke()}/>

					<EdgeIndicator itemType="last"
						orient="right"
						edgeAt="right"
						yAccessor={d => d.close}
						fill={d => d.close > d.open ? "#6BA583" : "#FF0000"}/>

				</Chart>
				<Chart id={2}
						yExtents={[d => d.volume]}
						height={150} origin={(w, h) => [0, h - 150]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format(".0s")}/>

					<BarSeries yAccessor={d => d.volume} fill={"#737373" /* d => d.close > d.open ? "#6BA583" : "#FF0000" */} />
				</Chart>
				<HoverTooltip
					chartId={1}
					yAccessor={ema12.accessor()}
					tooltipContent={tooltipContent([ema12, ema26])}
					fontSize={15} />
			</ChartCanvas>
		);
	}
}

CandleStickChartWithHoverTooltip.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	ratio: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithHoverTooltip.defaultProps = {
	type: "svg",
};
CandleStickChartWithHoverTooltip = fitWidth(CandleStickChartWithHoverTooltip);

var startdate, lastdate;
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
// d3["tsv"]("//rrag.github.io/react-stockcharts/data/MSFT.tsv", (err, data) => {
// 	/* change MSFT.tsv to MSFT_full.tsv above to see how this works with lots of data points */
// 	data.forEach((d, i) => {
// 		d.date = new Date(d3.timeParse("%Y-%m-%d")(d.date).getTime());
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;
// 		// console.log(d);
// 	});
// 	startdate = data[0].date;
// 	lastdate = data[data.length-1].date;
// 	console.log('origin', data);
// 	/* change the type from hybrid to svg to compare the performance between svg and canvas */
// 	ReactDOM.render(<CandleStickChartWithHoverTooltip data={data} type={'hybrid'} />, document.getElementById("chart"));
// });

var startdate, lastdate;
var parseDate = d3.timeParse("%Y-%m-%d %H:%M:%S");
var myUrl = 'http://192.168.1.99:7002/api/v1/candles/BTC-LTC';
d3["json"](myUrl, (err, data) => {
	/* change MSFT.tsv to MSFT_full.tsv above to see how this works with lots of data points */
	data.forEach((d, i) => {
		d.date = new Date(d3.timeParse("%Y-%m-%d %H:%M:%S")(d.timestamp).getTime());
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;
		// console.log(d);
	});
	startdate = data[0].date;
	lastdate = data[data.length-1].date;
	/* change the type from hybrid to svg to compare the performance between svg and canvas */
	ReactDOM.render(<CandleStickChartWithHoverTooltip data={data} type='svg' />, document.getElementById("chart"));
});