import _ from 'lodash'

export const methods = {
    getAverage: (indicators) => {
        let data = _.map(indicators, (indicator) => {
            let {
                date
            } = indicator;
            date = date.toLocaleString("en-us", {
                month: "long"
            });
            indicator.date = date;
            return indicator;
        })
        let sortedData = [];
        for (let i = 0; i < data.length; i++) {
            let found = false;
            for (let j = 0; j < sortedData.length; j++) {
                if (
                    data[i].date === sortedData[j].date &&
                    data[i].indicator_id === sortedData[j].indicator_id
                ) {
                    found = true;
                    data[i].reading = parseInt(data[i].reading);
                    sortedData[j].count++;
                    sortedData[j].reading += data[i].reading;
                    j = sortedData.length + 1;
                }
            }
            if (!found) {
                data[i].reading = parseInt(data[i].reading, 10);
                data[i].count = 1;
                sortedData.push(data[i]);
            }
        }
        
        for (let i = 0; i < sortedData.length; i++) {
            sortedData[i].reading = Math.floor(
                sortedData[i].reading / sortedData[i].count
            );
            delete sortedData[i].count;
        }
        return sortedData;
    },
    filterIndicator: (indicators, id) =>
        _.filter(indicators, indicator => indicator.indicator_id === id),
    getMonths: indicator => _.map(indicator, el => el.date),
    getLabels: indicators => indicators.filter((month, i, array) => 
    array.indexOf(month) === i),
    getData: (indicators, months, id) => {
        _.map(months, month => {
            let validate = false
            indicators.map(indicator => {
                if (indicator.date === month) {
                    validate = true
                }
                return null
            })
            if (validate === false) {
                indicators.push({indicator_id:id, reading: null, date:month})
            }
        })
       let data =  _.map(indicators, el => el.reading)
       return data
    },
    getLabelName: (id) => {
        switch (id) {
            case 1: 
                return "Glucose Level"
            case 2:
                return "Blood_pressure - Systolic"
            case 3:
                return "Blood_pressure - Diastolic"
            case 4: 
                return "Pain Scale"
            case 5:
                return "Overall Condition"

            default:
            return 'unknown'
        }
    }
}
