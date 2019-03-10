const initialState = {
    glucose_level: 0,
    blood_pressure_systolic: 0,
    blood_pressure_diastolic: 0,
    pain_scale:0,
    overall_condition: 0,
    overallConditionSwitch: true,
    painSwitch: false,
    glucoseSwitch:false,
    bloodPresureSwitch: false
}

const UPDATE_INDICATOR = "UPDATE_INDICATOR"
const UPDATE_SWITCH = "UPDATE_SWITCH"
const CLEAR_STATE = "CLEAR_STATE"

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

export function clearState(){
    return {
        type: CLEAR_STATE
    }
}

export default function indicatorsReducer( state = initialState, action ) {
    const { type, payload } = action

    switch(type) {
        case UPDATE_INDICATOR:
            const propertyIndicator = Object.getOwnPropertyNames(payload)
            return {...state, [ propertyIndicator[0]]: payload[propertyIndicator[0]] }

        case UPDATE_SWITCH:
            const value = payload
            return {...state, [value]: !state[value]}
        
        case CLEAR_STATE:
            return {
                glucose_level: 0,
                blood_pressure_systolic: 0,
                blood_pressure_diastolic: 0,
                pain_scale:0,
                overall_condition: 0,
                overallConditionSwitch: true,
                painSwitch: false,
                glucoseSwitch:false,
                bloodPresureSwitch: false
            }

        default: 
            return state
    }
}