import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Playback from './Playback';

class AllBroadcasts extends Component {
	constructor(props) {
		super(props)
	}

	filterLive = broadcasts => {
		const liveCasts = broadcasts.filter( broadcast => broadcast.isLive);
		return liveCasts;
	}

	filterArchived = broadcasts => {
		const archivedCasts = broadcasts.filter( broadcast => !broadcast.isLive);
		return archivedCasts;
	}

	render(){
		const { broadcasts } = this.props;
		return broadcasts ? (
			<div className="all-broadcasts">
				<h1 id="all-broadcasts-title">Currently Live!</h1>
				<div className="all-cast-cards">
					{ this.filterLive(broadcasts).length ?
						this.filterLive(broadcasts).map( broadcast => {
							return (
								<Playback
									className="station-card"
									key={broadcast.id}
									broadcastId={broadcast.id}
									stationLogo={broadcast.station.logoUrl}
								/>
							);
						})
						: <h1 id="text-glow">There are currently no live casts (hint hint).</h1>
					}
				</div>
				<h1 id="all-broadcasts-title">Archived broadcasts</h1>
				<div className="all-cast-cards">
						{
							this.filterArchived(broadcasts).map( broadcast => {
								return (
									<Playback
										className="station-card"
										key={broadcast.id}
										broadcastId={broadcast.id}
									/>
								);
							})
						}
					</div>
			</div>
		) :
		(
			<h1>There are no broadcasts</h1>
		);
	}
}

const mapState = state => {
	return {
		broadcasts: state.broadcasts
	};
};

export default connect(mapState)(AllBroadcasts);
