import React from 'react'
import {connect} from "react-redux";

class Timer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        session : true,
        sessionMin : this.props.session,
        breakMin : this.props.break,
        seconds : 59,
        currentTime : this.props.session + ':00',
        timer : 0,
        start : false,
        audio : new Audio("https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3")
    }
    this.startTime = this.startTime.bind(this);
    this.resetTime = this.resetTime.bind(this);
    this.handleCurrentTime = this.handleCurrentTime.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.session !== state.sessionMin){
      let newTime ="";
        if(props.session >= 10){
          newTime =  props.session + ':00'
        }else{
          newTime =  "0" + props.session + ':00'
        }
        return{
            sessionMin: props.session,
            currentTime : newTime
        };
    }else if(props.break !== state.breakMin){
      return{
        breakMin: props.break
    };
    }
    return null; 
}

componentDidMount(){
  clearInterval(this.state.timer);
  this.handleCurrentTime(this.state.sessionMin)
}
handleCurrentTime = minutes => {
  if(this.state.start){
    if(minutes >= 10){
      if(this.state.seconds >= 10){
        this.setState({currentTime :  minutes + ':' + this.state.seconds});
      }else{
        this.setState({currentTime :  minutes + ':0' + this.state.seconds});
      }
    }else{
      if(this.state.seconds >= 10){
        this.setState({currentTime :  "0" + minutes + ':' + this.state.seconds});
      }else{
        this.setState({currentTime :  "0" + minutes + ':0' + this.state.seconds});
      }
    }
  }else{
    if(minutes > 10){
      this.setState({currentTime :  minutes + ':00'});
    }else if(minutes < 10){
      this.setState({currentTime :  "0"+minutes + ':00'});
    }
  }

}
startTime(){
  //pause : clearign the intervall and stoping the time
  if(this.state.start){
    clearInterval(this.state.timer);
    this.setState({start : false , timer : 0});
    return;
  }
  //session
  this.setState({start : true})
  if(this.state.session){
    let minutes = this.state.sessionMin - 1;
    const intervall = setInterval(() => {
      this.setState(prevState => {return {seconds : prevState.seconds -1}});
      this.handleCurrentTime(minutes)
      if(this.state.seconds < 0){
        this.setState(prevState => {return {seconds : prevState.seconds -1, currentTime : minutes + ':' + this.state.seconds}});
        if(minutes === 0){
          clearInterval(this.state.timer);
          this.state.audio.play();
          this.setState({start : false , timer : 0, session : false , currentTime : this.state.breakMin + ":00", seconds : 59});
          return;
        }
        minutes -= 1;
        this.setState(() =>{return {seconds : 59}});
        this.handleCurrentTime(minutes)
      }
    }, 1000);
    this.setState(prevState => {
      return {
        start : true,
        currentTime : minutes + ':' + this.state.seconds,
        timer : intervall
      }
    })
  }else{ //break
    let minutes = this.state.breakMin - 1;
    const intervall = setInterval(() => {
      this.setState(prevState => {return {seconds : prevState.seconds -1}});
      this.handleCurrentTime(minutes);
      if(this.state.seconds === 0){
        if(minutes === 0){
          clearInterval(this.state.timer);
          this.state.audio.play();
          this.setState({session : true , timer : 0,start : false , seconds : 59,currentTime : this.state.sessionMin + ":00"});
          return;
        }
        minutes -= 1;
        this.setState(() =>{return {seconds : 59, currentTime : minutes + ':' + this.state.seconds}});
      }
      
    }, 1000);
    this.setState(prevState => {
      return {
        start : true,
        currentTime : minutes + ':' + this.state.seconds,
        timer : intervall
      }
    })
  }
}

resetTime(){
  clearInterval(this.state.timer);
  this.setState({start : false , timer : 0,session:true, sessionMin : this.props.session, breakMin : this.props.break , seconds:59});
  if(this.state.sessionMin >= 10){
    this.setState({currentTime : this.state.sessionMin + ':00'})
  }else{
    this.setState({currentTime : "0" + this.state.sessionMin + ':00'})
  }
}

render(){
  return (
    <div>
      <br />
      <div id="timer">
          <h3 id="timer-label">{this.state.session ? "Time To Work !" : "Take A Break !"}</h3>
          <hr />
          <h1 id="time-left">{this.state.currentTime}</h1>
          <hr></hr>
          <div id="controls">
            <div className="row">
              <div className="col-3"></div>
              <div className = "col-sm-3 col-xs-6"><button id="start-stop" className="btn control" onClick={this.startTime}>{!this.state.start? "Start" : "Pause"}</button></div>
              <div className = "col-sm-3 col-xs-6"><button id="reset" className="btn control" onClick={this.resetTime}>Reset</button></div>
            </div>
          </div>
        </div>
      </div>
      )
  }
}



const mapToStateToProps = (state) => {
  return {
    session : state.session,
    break : state.break
  }
}

export default connect(mapToStateToProps,null)(Timer);