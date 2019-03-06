const initialState = {
    id: 0,
    username: ``,
    name: ``,
    indicators:[],
    conditions: [],
    entries: []
}

const UPDATE_USER = 'UPDATE_USER'

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export default function reducer( state = initialState, action ) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
            const { id, username, name } = payload
            return { ...state, id, username, name }
        default:
            return state
    }
}