import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { AllBroadcast } from './AllBroadcasts'

export class Landing extends Component {
    constructor(props){
        super(props)
        // bind methods...
    }

    render() {
        return(
            <div className='main-container'>
                <div className="main-body max-width max-height flex auto">
                    <div className='auto flex'>
                        <h3 className='center-text white-font'>This is the main body of the landing page </h3>
                    </div>
                </div>
                <div className="break auto">
                    <div className="auto flex">
                        <h5 className="center-text white-font auto">This is sample text</h5>
                        <p className="center-text white-font auto"> This is a sample paragraph</p>
                    </div>
                </div>
                <div className="lower-body max-width max-height flex auto">
                    <div className="auto flex">
                        <h3 className='center-text white-font'>This is the lower body of the landing Page</h3>
                    </div>
                </div>
            </div>
        )
    }
}
