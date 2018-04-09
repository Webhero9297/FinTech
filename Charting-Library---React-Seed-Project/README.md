## Questions and support

If you have questions or get stuck using this project or the ChartIQ library, the dev support team can be reached through [dev@chartiq.com](mailto:dev@chartiq.com).

# Charting-Library---React-Seed-Project

This is a basic build of the ChartIQ library within the React framework. This provides an example of how to implement the most common elements in the library. This is not a comprehensive example, more like a good starting point for an React developer.

## Requirements

* A copy of the ChartIQ library, version 3.0+ is required. To get your copy, visit https://www.chartiq.com/products/html5-charting-library/ to see a demo and get in touch with us.

* NodeJS (https://nodejs.org/). We use NodeJS and Node Package Manager (NPM) to load the React components as well as the different libraries to transform JSX and ES6 to ES5.

## Getting started

To view the example, you will need to copy or link the ChartIQ `js` and `css` directories inside of the `chartiq` directory. To do this, execute the following commands in a terminal or command line:

### In OS X:

```
ln -s <path to extracted ChartIQ library>/js <path to React Seed project>/chartiq/js
ln -s <path to extracted ChartIQ library>/css <path to React Seed project>/chartiq/css
```

### In Windows:

```
mklink /d <path to React Seed project>\chartiq\js <path to extracted ChartIQ library>\js
mklink /d <path to React Seed project>\chartiq\css <path to extracted ChartIQ library>\css
```

### Running Locally

You will need to install the project's dependencies and build the distribution file by running the following command from the project's root:

```
npm install
```

Once you have that, run ```npm start``` and open your browser window to localhost port 3000 to view the fully working example.

## Customizing

*Note: We do not recommend using the web components from template-advanced.html within frameworks. Unless you have very advanced skills, you are better off building framework components that interface with the charting library.*

All of the project source is in the `src` folder. The main ChartIQ React component is `app.jsx`. There is also an `index.js` in this folder which loads RequireJs and all of our modules into it. This is basically a wrapper component that houses the charting engine in it's state. This wrapper function passes a reference of the engine to all of the UI components which allow each to manipulate the chart based on their functionality.

The chart engine is created inside of the `componentDidMount` function of the wrapper component. This is done in the location because React uses a virtual DOM and the chart component is not injected into the actual DOM until after the render function.

```
componentDidMount() {
    var ciq = new CIQ.ChartEngine({
        container: $$$("#chartContainer")
    });
    this.setState({
        ciq: ciq
    }, function() {
        this.attachFeed(this.props.feed ? this.props.feed :
                new CIQ.QuoteFeed[this.state.feed]());
        ciq.newChart(this.props.symbol ? this.props.symbol : "AAPL");
    })
}
```


## Building for use in the browser

This project is using Webpack to transform JSX and ES6 to ES5. The configs for this are in the `webpack.config.js`.
Running `npm run build` from the command line will re-create the distribution file `dist/chartIQ.js`.
This is a transformed and bundled version of everything in the src directory. `src/index.js` will automatically load this file.


## Contributing to this project

If you wish to contribute to this project, fork it and send us a pull request.
We'd love to see what it is you want to do with our charting tools!
