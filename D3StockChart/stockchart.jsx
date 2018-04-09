"use strict";
var { ChartCanvas, Chart, series, scale, coordinates, tooltip, axes, indicator, helper } = ReStock;

var { CandlestickSeries, BarSeries } = series;
var { discontinuousTimeScaleProvider } = scale;

var { CrossHairCursor, MouseCoordinateX, MouseCoordinateY, EdgeIndicator } = coordinates;

var { OHLCTooltip, HoverTooltip } = tooltip;

var { XAxis, YAxis } = axes;
var { ema, sma } = indicator;

var { fitWidth, TypeChooser } = helper;

class CandleStickChartWithZoomPan extends React.Component {
	constructor(props) {
		super(props);
		this.saveNode = this.saveNode.bind(this);
		this.resetYDomain = this.resetYDomain.bind(this);
	}
	saveNode(node) {
		this.node = node;
	}
	resetYDomain() {
		this.node.resetYDomain();
	}
	render() {
		var { data, type, width, ratio } = this.props;

		var { mouseMoveEvent, panEvent, zoomEvent } = this.props;
		var { clamp } = this.props;

		var down_color = "#38D864", up_color = "#FF0000";
		const candlesAppearance = {
			wickStroke: function fill(d) {
				return d.close > d.open ? down_color : up_color;
			},
			fill: function fill(d) {
			  return d.close > d.open ? down_color : up_color;
			},
			stroke: function fill(d) {
				return d.close > d.open ? down_color : up_color;
			},
			candleStrokeWidth: 1,
			widthRatio: 0.8,
			opacity: 1,
			candleWidth:3
		}
		const cursorTheme = {
			cursor: "pointer"
		}
		return (
			<ChartCanvas ref={this.saveNode} height={400} width={width} ratio={ratio}
					margin={{ left: 70, right: 70, top: 10, bottom: 30 }} type={type} style={{cursor: "pointer"}}
					seriesName="MSFT"
					data={data}
					mouseMoveEvent={mouseMoveEvent}
					panEvent={panEvent}
					zoomEvent={zoomEvent}
					clamp={clamp}
					xAccessor={d => d.date}
					xScale={d3.scaleTime()}
					xScaleProvider={discontinuousTimeScaleProvider}
					xExtents={[startdate, lastdate]}>
				<Chart id={1}	yExtents={[d => [d.high, d.low]]}>
					<XAxis axisAt="bottom" orient="bottom" zoomEnabled={!zoomEvent} className="A" stroke="#fff"/>
					<YAxis axisAt="right" orient="right" ticks={12} zoomEnabled={!zoomEvent} stroke="#fff" />
					<MouseCoordinateX at="bottom" orient="bottom" stroke="#fff"	displayFormat={(d3.timeFormat("%Y-%m-%d"))} />
					<MouseCoordinateY at="right" orient="right"	displayFormat={d3.format(".2f")} stroke="5" />
					<CandlestickSeries {...candlesAppearance}/>    
					<OHLCTooltip origin={[-40, 0]}/>
					<EdgeIndicator itemType="last" orient="right" edgeAt="right" yAccessor={d => d.close} stroke={"#0000ff"} fill={d => d.close > d.open ? down_color : up_color}/>
				</Chart>
				<Chart id={2} yExtents={d => d.volume} height={150} origin={(w, h) => [0, h - 150]}>
					<YAxis axisAt="left" orient="left" ticks={5} tickFormat={d3.format(".0s")} zoomEnabled={!zoomEvent} />
					<BarSeries yAccessor={d => d.volume} fill={"#99999935"} stroke={"#99999935"} />
				</Chart>
				<CrossHairCursor style={{ cursor: 'pointer' }} />
			</ChartCanvas>
		);
	}
}

CandleStickChartWithZoomPan.propTypes = {
	data: React.PropTypes.array.isRequired,
	width: React.PropTypes.number.isRequired,
	ratio: React.PropTypes.number.isRequired,
	type: React.PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickChartWithZoomPan.defaultProps = {type: "svg",mouseMoveEvent: true,panEvent: true,zoomEvent: true,clamp: false};
CandleStickChartWithZoomPan = fitWidth(CandleStickChartWithZoomPan);

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
	// startdate.setDate(startdate.getDate() - 2 );
	lastdate = data[data.length-1].date;
	// lastdate.setDate(lastdate.getDate() + 2 );
	// console.log(data, startdate, lastdate);
	/* change the type from hybrid to svg to compare the performance between svg and canvas */
	ReactDOM.render(<CandleStickChartWithZoomPan data={data} type='svg' />, document.getElementById("chart"));
});
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
// 	/* change the type from hybrid to svg to compare the performance between svg and canvas */
// 	ReactDOM.render(<CandleStickChartWithZoomPan data={data} />, document.getElementById("chart"));
// });