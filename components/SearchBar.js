import React from 'react';

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.indexEl = <></>;
  }

  onSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    this.props.onSubmit(data.get('q').toString());
  }

  componentDidMount() {
    this.indexEl.focus();
  }

	render() {
		return (
			<form onSubmit={this.onSubmit}>
				<div className="cf">
					<input
						type="text"
						placeholder="Search For Articles"
            name="q"
            ref={el => (this.indexEl = el)}
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
