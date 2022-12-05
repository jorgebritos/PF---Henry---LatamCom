var React = require('react');
var ReactDOM = require('react-dom');
var Carousel = require('react-responsive-carousel').Carousel;

var DemoCarousel = React.createClass({
	render() {
		return (
			<Carousel
				showArrows={true}
				onChange={onChange}
				onClickItem={onClickItem}
				onClickThumb={onClickThumb}>
				<div>
					<img src='assets/1.jpeg' />
					<p className='legend'>Legend 1</p>
				</div>
				<div>
					<img src='assets/2.jpeg' />
					<p className='legend'>Legend 2</p>
				</div>
				<div>
					<img src='assets/3.jpeg' />
					<p className='legend'>Legend 3</p>
				</div>
			</Carousel>
		);
	},
});
ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));
