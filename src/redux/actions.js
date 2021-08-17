function setTimer(time){

    return {
        type : "setTime",
        payload : {session : time.sessionTime, break: time.breaktime}
    }
}

export default setTimer;