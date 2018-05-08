import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export default class Broadcasts extends Component {
    constructor(props) {
        super(props)
        // Bind methods...
    }

    render(){
        return(
            <div>
                This is the all broadcasts component.
            </div>
        )
    }
}