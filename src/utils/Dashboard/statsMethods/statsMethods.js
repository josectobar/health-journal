import _ from 'lodash'

export const methods = {
    changeDate: (indicators) => {
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
        return data
    },
    getAverage: (data) =>{
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
    getData: indicator => _.map(indicator, el => el.reading),
    getLabelName: (id) => {
        switch (id) {
            case 1: 
                return "Glucose Level"
            case 2:
            case 3:
                return "Blood_pressure"
            case 4: 
                return "Pain Scale"
            case 5:
                return "Overall Condition"

            default:
            return 'unknown'
        }
    }
}
export const genMainChart= (indicators, id) => {
    let dateToMonth = this.getMonths(indicators)
    let indWithAvg = this.getAverage(dateToMonth)
    let labels = this.getLabels(indWithAvg)
    let filteredInd = this.filterIndicator(indWithAvg, id)
    let data = this.getData(filteredInd)
    let label = this.getLabelName(id)

    return {
        labels: labels,
        datasets: [{
            label:label,
            data:data
        }]
    }
}
