import { methods } from './statsMethods'

export function dataGen(indicatorsId, propsIndicators){
    const chartDisplay = indicatorsId.map(id => {
        const {
          getAverage,
          filterIndicator,
          getMonths,
          getLabels,
          getData,
          getLabelName
        } = methods;
        let indicators = getAverage(propsIndicators);
        // filter all months listed in the indicators
        let months = getMonths(indicators);
        indicators = filterIndicator(indicators, id);
        // labels months without duplacates
        let labels = getLabels(months);
        let Data = getData(indicators, labels, id);
        let labelName = getLabelName(id);
        const result = {
          labels: labels,
          datasets: [
            {
              label: labelName,
              data: Data
            }
          ]
        };
        return result;
      });
    return chartDisplay
}