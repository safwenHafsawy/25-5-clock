import React, { Component } from 'react';
import {connect} from "react-redux";
import setTimer from "../redux/actions";
 
class Session extends Component {
    constructor(props){
        super(props);
        this.state = {
            sessionTime : 25,
            breakTime:5
        }
        this.incrementSession = this.incrementSession.bind(this);
        this.decrementSession = this.decrementSession.bind(this);
        this.incrementBreak = this.incrementBreak.bind(this);
        this.decrementBreak = this.decrementBreak.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }

    incrementSession(){
        if(this.state.sessionTime < 60){
            this.setState(prevState => ({
                sessionTime : prevState.sessionTime + 1
            }))
        }
    }

    decrementSession(){
        if(this.state.sessionTime > 1){
            this.setState(prevState => ({
                sessionTime : prevState.sessionTime - 1
            }))
        }
    }

    incrementBreak(){
        if(this.state.breakTime <60){
            this.setState(prevState => ({
                breakTime : prevState.breakTime + 1
            }))
        }
    }

    decrementBreak(){
        if(this.state.breakTime > 1){
            this.setState(prevState => ({
                breakTime : prevState.breakTime - 1
            }))
        }
    }

    setTimer(){
        this.props.setTimer({sessionTime : this.state.sessionTime, breaktime : this.state.breakTime});
    }

    render() {
        return (
            <div id="session" className="row">
                <div id="session-set" className="col-sm-6 col-xs-10 sets">
                <label id="break-label"><h3>Session Length</h3></label>
                    <hr />
                    <h3 id="break-length" className="length">{this.state.sessionTime} min</h3>
                    <hr />
                    <button id="break-increment" className="btn increment" onClick = {this.incrementSession}>Increment</button>
                    <button id="break-decrement" className="btn decrement" onClick = {this.decrementSession}>Decrement</button>
                </div>
                <div id="break-set" className="col-xs-12 col-sm-6 sets">
                    <label id="break-label"><h3>Break Length</h3></label>
                    <hr />
                    <h3 id="break-length" className="length">{this.state.breakTime} min</h3>
                    <hr />
                    <button id="break-increment" className="btn increment" onClick = {this.incrementBreak}>Increment</button>
                    <button id="break-decrement" className="btn decrement" onClick = {this.decrementBreak}>Decrement</button>
                </div>
                <hr></hr>
                <a href="#timer" className="sendbtn" onClick={this.setTimer}>Start Session</a>
            </div>
        )
    }
}


const mapDipatchToprops = dispatch => {
    return{
        setTimer : time => dispatch(setTimer(time))
    }
}

export default connect(null,mapDipatchToprops)(Session);