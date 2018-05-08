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
            <div>
               This is the landing page 
            </div>
        )
    }
}
