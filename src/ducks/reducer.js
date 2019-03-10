const initialState = {
    id: 0,
    username: ``,
    name: ``,
    email: ``,
    conditions: [],
    entries: [],
    wizard: true
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_WIZARD = 'UPDATE_WIZARD'
const CLEAR_STATE = 'CLEAR_STATE'


export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateWizard(wizard){
    return {
        type: UPDATE_WIZARD,
        payload: wizard
    }
}

export function clearState(){
    return {type: CLEAR_STATE}
}

export default function reducer( state = initialState, action ) {
    const { type, payload } = action
    switch (type) {

        case UPDATE_USER:
            const { id, username, name, email, wizard } = payload
            return { ...state, id, username, name, email, wizard }

        case UPDATE_WIZARD:
            return {...state, wizard: payload }

        case CLEAR_STATE:
            return {
                id: 0,
                username: ``,
                name: ``,
                email: ``,
                indicators:[],
                conditions: [],
                entries: [],
                wizard: true
            }

        default:
            return state
    }
}