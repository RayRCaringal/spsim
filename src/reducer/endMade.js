const endReducer = (state = false, action)=> {
    switch(action.type){
        case 'End':
            return !state
        default:
            return state
    }
}

export default endReducer