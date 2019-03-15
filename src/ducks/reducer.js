const initialState = {
    id: 0,
    username: ``,
    name: ``,
    email: ``,
    conditions: [],
    entries: [],
    entry: {
        date: new Date(),
        content: ``,
        title: ``,
        tags: []
    },
    wizard: true
}

const UPDATE_USER = 'UPDATE_USER'
const UPDATE_WIZARD = 'UPDATE_WIZARD'
const CLEAR_STATE = 'CLEAR_STATE'
const CLEAR_ENTRY = 'CLEAR_ENTRY'
const UPDATE_ENTRIES = 'UPDATE_ENTRIES'
const UPDATE_ENTRY = 'UPDATE_ENTRY'


export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function updateWizard(wizard) {
    return {
        type: UPDATE_WIZARD,
        payload: wizard
    }
}

export function updateEntries(entries) {
    return {
        type: UPDATE_ENTRIES,
        payload: entries
    }
}

export function updateEntry(obj) {
    return {
        type: UPDATE_ENTRY,
        payload: obj
    }
}

export function clearState() {
    return {
        type: CLEAR_STATE
    }
}

export function clearEntry() {
    return {
        type: CLEAR_ENTRY
    }
}

export default function reducer(state = initialState, action) {
    const {
        type,
        payload
    } = action
    switch (type) {

        case UPDATE_USER:
            const {
                id,
                username,
                name,
                email,
                wizard
            } = payload
            return {
                ...state,
                id,
                username,
                name,
                email,
                wizard
            }

        case UPDATE_WIZARD:
            return {
                ...state,
                wizard: payload
            }

        case UPDATE_ENTRIES:
            return {
                ...state,
                entries: payload
            }

        case UPDATE_ENTRY:
            return {
                ...state,
                entry: {
                    ...state.entry,
                    ...payload
                }
            }

        case CLEAR_STATE:
            return {
                id: 0,
                username: ``,
                name: ``,
                email: ``,
                conditions: [],
                entries: [],
                entry: {
                    date: new Date(),
                    content: ``,
                    title: ``,
                    tags: []
                },
                wizard: true
            }

        case CLEAR_ENTRY:
            return {
                ...state,
                entry: {
                    date: new Date(),
                    content: ``,
                    title: ``
                }
            }

        default:
            return state
    }
}