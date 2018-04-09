
import { tsvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";
import $ from 'jquery';

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");
var iso = timeParse("%Y-%m-%d %H:%M:%S");
export function getData() {
	const promiseMSFT = fetch("./MSFT.tsv")
		.then(response => response.text())
		.then(data => tsvParse(data, parseData(parseDate)))
	return promiseMSFT;
}
export function loadData() {
	var myUrl = 'http://192.168.1.99:7002/api/v1/getstockchartdata';
	var ret = $.ajax({url: myUrl}).done(function(resp){
		resp.map(function(arr){
			return reSet(arr, iso);
		});
	}).catch(function(err){
		console.log(err);
	});
	return ret;
}
function reSet( d, parse ) {
	d.date = parse(d.date);
	d.open = +d.open;
	d.high = +d.high;
	d.low = +d.low;
	d.close = +d.close;
	d.volume = +d.volume;
	return d;
}