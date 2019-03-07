const initialState = {
    id: 0,
    username: ``,
    name: ``,
    email: ``,
    indicators:[],
    conditions: [],
    entries: [],
    wizard: true
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_STATE = 'CLEAR_STATE'

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
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