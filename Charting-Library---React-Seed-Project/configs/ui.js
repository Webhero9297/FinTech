export default

{
	"periodicity": {
		"options": [{
			"period": 1,
			"interval": 1,
			"label": "1 Min"
		}, {
			"period": 1,
			"interval": 3,
			"label": "3 Min"
		}, {
			"period": 1,
			"interval": 5,
			"label": "5 Min"
		}, {
			"period": 1,
			"interval": 10,
			"label": "10 Min"
		}, {
			"period": 3,
			"interval": 5,
			"label": "15 Min"
		}, {
			"period": 1,
			"interval": 30,
			"label": "30 Min"
		}, {
			"period": 2,
			"interval": 30,
			"label": "1 Hour"
		}, {
			"period": 8,
			"interval": 30,
			"label": "4 Hour"
		}, {
			"period": 1,
			"interval": "day",
			"label": "1 Day"
		}, {
			"period": 2,
			"interval": "day",
			"label": "2 Day"
		}, {
			"period": 3,
			"interval": "day",
			"label": "3 Day"
		}, {
			"period": 5,
			"interval": "day",
			"label": "5 Day"
		}, {
			"period": 10,
			"interval": "day",
			"label": "10 Day"
		}, {
			"period": 20,
			"interval": "day",
			"label": "20 Day"
		}, {
			"period": 1,
			"interval": "week",
			"label": "1 Wk"
		}, {
			"period": 1,
			"interval": "month",
			"label": "1 Mon"
		}]
	},
	chartTypes: {
		types: [{
			type: 'bar',
			label: 'Bar',
		}, {
			type: 'candle',
			label: 'Candle',
		}, {
			type: 'colored_bar',
			label: 'Colored bar',
		}, {
			type: 'hollow_candle',
			label: 'Hollow candle',
		}, {
			type: 'line',
			label: 'Line',
		}, {
			type: 'mountain',
			label: 'Mountain',
		}, {
			type: 'volume_candle',
			label: 'Volume candle',
		}, {
			type: 'heikinashi',
			label: 'Heikin-Ashi',
		}, {
			type: 'kagi',
			label: 'Kagi',
			aggregationEdit: {
				title: 'Set Reversal Percentage',
				inputs: [{
					lookup: 'kagi',
					label: 'Kagi',
				}]
			}
		}, {
			type: 'linebreak',
			label: 'Line break',
			aggregationEdit: {
				title: 'Set Price Lines',
				inputs: [{
					lookup: 'priceLines',
					label: 'Price line'
				}]
			}
		}, {
			type: 'renko',
			label: 'Renko',
			aggregationEdit: {
				title: 'Set Range',
				inputs: [{
					lookup: 'renko',
					label: 'Renko'
				}]
			}
		}, {
			type: 'rangebars',
			label: 'Range bars',
			aggregationEdit: {
				title: 'Set Range',
				inputs: [{
					lookup: 'range',
					label: 'Range'
				}]
			}
		}, {
			type: 'pandf',
			label: 'Point & figure',
			aggregationEdit: {
				title: 'Set Point & Figure Parameters',
				inputs: [{
					lookup: 'pandf.box',
					label: 'Box'
				}, {
					lookup: 'pandf.reversal',
					label: 'Reversal'
				}]
			}
		}]
	}
}