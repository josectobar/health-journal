const initialState = {
    date: new Date(),
    glucose_level: {user_id:null, indicator_id: null, reading: 0, date:null},
    blood_pressure_systolic: {user_id:null, indicator_id: null, reading: 0, date:null},
    blood_pressure_diastolic: {user_id:null, indicator_id: null, reading: 0, date:null},
    pain_scale:{user_id:null, indicator_id: null, reading: 0, date:null},
    overall_condition: {user_id:null, indicator_id: null, reading: 0, date:null},
    overallConditionSwitch: true,
    painSwitch: false,
    glucoseSwitch:false,
    bloodPresureSwitch: false,
    indicators: {}
}

const UPDATE_INDICATOR = "UPDATE_INDICATOR"
const UPDATE_INDICATORS = "UPDATE_INDICATORS"
const UPDATE_SWITCH = "UPDATE_SWITCH"
const CLEAR_INDSTATE = "CLEAR_INDSTATE"
const UPDATE_DATE = "UPDATE_DATE"

export function updateDate(date){
    
    return {
        type: UPDATE_DATE,
        payload: date
    }
}

export function updateIndicators(obj){
    return {
        type: UPDATE_INDICATORS,
        payload: obj
    }
}

export function updateIndicator(obj){
    return {
        type: UPDATE_INDICATOR,
        payload: obj
    }
}

export function updateSwitch(value){
    return {
        type: UPDATE_SWITCH,
        payload: value
    }
}

export function clearIndState(){
    return {
        type: CLEAR_INDSTATE
    }
}

export default function indicatorsReducer( state = initialState, action ) {
    const { type, payload } = action

    switch(type) {

        case UPDATE_DATE:
            return {...state, date: payload}

        case UPDATE_INDICATORS:
            return {...state, indicators: [...payload] }
        
            case UPDATE_INDICATOR:
            const propertyIndicator = Object.getOwnPropertyNames(payload)
            return {...state, [ propertyIndicator[0]]: payload[propertyIndicator[0]] }

        case UPDATE_SWITCH:
            const value = payload
            return {...state, [value]: !state[value]}
        
        case CLEAR_INDSTATE:
            return {
                date: new Date(),
                glucose_level: {user_id:null, indicator_id: null, reading: 0, date:null},
                blood_pressure_systolic: {user_id:null, indicator_id: null, reading: 0, date:null},
                blood_pressure_diastolic: {user_id:null, indicator_id: null, reading: 0, date:null},
                pain_scale:{user_id:null, indicator_id: null, reading: 0, date:null},
                overall_condition: {user_id:null, indicator_id: null, reading: 0, date:null},
                overallConditionSwitch: true,
                painSwitch: false,
                glucoseSwitch:false,
                bloodPresureSwitch: false,
                ...state.indicators
            }

        default: 
            return state
    }
}