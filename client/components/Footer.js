import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

export default class Footer extends Component {
    render() {
        return (
            <div className="footer-container auto max-width flex">
                <h5 className="white-font auto center-text"> <Icon name="copyright" />2018 GoLive Radio</h5>
            </div>
        )
    }
}
