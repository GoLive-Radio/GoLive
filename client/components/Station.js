import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Card} from 'semantic-ui-react';

export default class Station extends Component {
    constructor(props){
        super(props)
        this.state = {
            // Local State...
        }
        // Bind methods...
    }

    render() {
        return (
            <div className="height100">
                <div className="white-font auto flex station-card">
                    <span className="flex auto center-text">Station Name</span>
                    <span className="flex auto">Station Description</span>
                    <span className="flex auto">Station logoUrl</span>
                    <span className="flex auto">Station Tags</span>
                </div>
                <div className="auto flex">
                    <Link className="auto button-link white-font" to="/broadcasts/new-broadcast">Create Broadcast</Link>
        {/*<Link to="/stations/:stationId/broadcasts/new-broadcasts">Create Broadcast</Link>*/} 
                </div>
            </div>
        )
    }
}



/* CONTAINER */
// function mapState(state) {

// }

// function mapDispatch(state) {

// }
// export default connect(mapState, mapDispatch)(Station)