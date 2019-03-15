const initialState = {
    mainChart: {
        labels: [],
        datasets: [{
            label:``,
            data:[]
        }]
    }
}

const GET_MAIN_CHART = 'GET_MAIN_CHART'
const CLEAR_STATS_STATE = 'CLEAR_STATS_STATE'

export function getMainChart(obj){
    return {
        type: GET_MAIN_CHART,
        payload: obj
    }
}

export function clearStatsState(){
    return {
        type: CLEAR_STATS_STATE
    }
}

export default function statsReducer( state = initialState, action ){
    const { payload, type } = state
    switch(type) {
        case GET_MAIN_CHART:
            return {...state, payload}
        case CLEAR_STATS_STATE:
            return {
                labels: [],
                datasets: [{
                    label:``,
                    data:[]
                }]
            }
        default: 
        return state
    }
}