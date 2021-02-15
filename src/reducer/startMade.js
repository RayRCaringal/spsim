const startReducer = (state = false, action)=> {
    switch(action.type){
        case 'Start':
            return !state
        default:
            return state
    }
}

export default startReducer