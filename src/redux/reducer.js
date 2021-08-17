const timeReducer = (defaultstate = {session: 25, break: 5}, action) =>{
    switch(action.type){
        case "setTime":
            return {
                session : action.payload.session,
                break : action.payload.break
            }
        default : return defaultstate;
    }
}


export default timeReducer;