import extend from 'extend';

const initialState = {
    user_profile: null,
}

export default function (state = initialState, action){
    switch(action.type){

        case 'USER_AUTH':
        
            return extend ({}, state, {
                user_profile: action.payload
            });

        default:
            return state;    
    }
}