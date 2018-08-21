import React from 'react';
import { connect } from 'react-redux';

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
		this.indexEl = <div></div>;
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onKeyUp(event) {
		if (event.which === 13) {
			this.onSubmit(event);
		}
	}

  onSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    this.props.onSubmit(data.get('q').toString());
  }

  componentDidMount() {
    this.indexEl.focus();
  }

	render() {
    console.log('search props', this.props);
		return (
			<form onSubmit={this.onSubmit}>
				<div className="cf">
					<input
						type="text"
						placeholder="Search For Articles"
            name="q"
            ref={el => (this.indexEl = el)}
            value={this.props.query.q}
						className="f6 f5-l input-reset bn fl black-80 bg-white pa3 w-100 w-75-m w-80-l br2-ns br--left-ns"
					/>
					<input
						className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
						type="submit"
						value="Search"
					/>
				</div>
			</form>
		);
	}
}

const mapStateToProps = (state) => ({
  query: state.main.query
});

export default connect(mapStateToProps)(SearchBar);
