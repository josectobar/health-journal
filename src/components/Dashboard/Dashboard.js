import React, { Component } from "react";
import "./Dashboard.scss";

import axios from "axios";

//lodash:
import _ from "lodash/fp";

//materialUI:
import Paper from "@material-ui/core/Paper";

//Redux:
import { connect } from "react-redux";
import { updateEntries } from "../../ducks/reducer";
import { updateIndicators } from "../../ducks/indicatorsReducer";
import { getMainChart } from "../../ducks/statsReducer";

//Routes:
import { Switch, Route, Link } from "react-router-dom";
import Stats from "./Stats/Stats";
import Articles from "./Articles/Articles";

//Components:
import EntryDisplay from "../Dashboard/EntriesDisplay/EntriesDisplay";
import ArticlesCard from "./Articles/ArticlesCard/ArticlesCard";
import MainChart from "./Stats/MainChart/MainChart";

//utilities:
import { methods } from "../../utils/Dashboard/statsMethods/statsMethods";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      id: 0,
      index: -1,
      indicators: [1, 2, 3, 4, 5],
      article: {
        description: ``,
        title: ``,
        urlToImage: ``,
        source: ``
      }
    };

    this.handleDataRequest = this.handleDataRequest.bind(this);
    this.handleEntryView = this.handleEntryView.bind(this);
  }

  componentDidMount() {
    this.handleDataRequest();
  }

  async handleDataRequest() {
    try {
      const {
        indicators,
        entries,
        updateEntries,
        updateIndicators
      } = this.props;
      if (!entries.length) {
        let entries = await axios.get("/api/entries");
        updateEntries(entries.data);
      }
      if (_.isEmpty(indicators)) {
        let dbIndicators = await axios.get("/api/indicators")
        dbIndicators = dbIndicators.data.map(indicator => {
          indicator.date = new Date(indicator.date);
          return indicator;
        });
        updateIndicators(dbIndicators);
      }

      // ------------------Articles ------------------///
      if (_.isEmpty(this.state.apiOneArticles)) {
        const searchWord = `fibromyalgia`;
        const apiKey = "6bc1156549ec47f3b0e638a9780c0167";
        let newsApiArticles = await axios.get(
          `https://newsapi.org/v2/everything?q=+headaches OR +fibromyalgia OR +fatigue&from=2019-03-10&sortBy=publishedAt&to=2019-03-014&apiKey=${apiKey}&sources=medical-news-today`
        );
        let article =
          newsApiArticles.data.articles[
            Math.floor(
              Math.random() * Math.floor(newsApiArticles.data.articles.length)
            )
          ];
        await this.setState({
          article: article
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  handleEntryView(id) {
    this.props.history.push(`/day/entry/${id}`);
  }

  handleClick = (event, id, index) => {
    this.setState({ anchorEl: event.currentTarget, id, index });
  };

  handleSelect = option => {
    const { id, index } = this.state;
    option === "Delete"
      ? this.handleDelete(id, index)
      : option === "Edit"
      ? this.props.history.push(`/day/entry/compose/${id}`)
      : option === "View"
      ? this.props.history.push(`/day/entry/${id}`)
      : this.setState({ anchorEl: null, id: 0, index: -1 });
  };

  handleDelete = async (id, index) => {
    let { updateEntries, entries } = this.props;
    entries.splice(index, 1);
    updateEntries(entries);
    let updatedEntries = await axios.delete(`/api/entry/${id}`);
    updateEntries(updatedEntries.data);
    this.setState({ anchorEl: null, id: 0, index: -1 });
  };

  handleEdit = id => {
    this.props.history.push(`/day/entry/compose/${id}`);
  };

  render() {
    const { anchorEl, indicators } = this.state;
    const open = Boolean(anchorEl);

    //Rendering entries list:
    const entries = this.props.entries.map((entry, index) => {
      let { date } = entry;
      date = new Date(date);
      date = date.toLocaleDateString();
      return (
        <EntryDisplay
          key={index}
          entry={entry}
          date={date}
          open={open}
          index={index}
          anchorEl={anchorEl}
          handleClick={this.handleClick}
          handleSelect={this.handleSelect}
        />
      );
    });

    //Rendering chart:
    const chartDisplay = indicators.map(id => {
      const {
        getAverage,
        filterIndicator,
        getMonths,
        getLabels,
        getData,
        getLabelName
      } = methods;
      let indicators = getAverage(this.props.indicators);
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
    return (
      <div>
        <Switch>
          <Route path="/day/dashboard/stats" component={Stats} />
          <Route path="/day/dashboard/articles" component={Articles} />
        </Switch>
        {this.props.location.pathname === "/day/dashboard" && (
          <div className="dashboard-container">
            <Paper className="flex-item stats-main" elevation={4}>
              <MainChart className="flex-item" data={chartDisplay} />
              <Link to="/day/dashboard/stats">Stats</Link>
            </Paper>
            <ArticlesCard className="flex-item" article={this.state.article} />
            <Paper elevation={4} className="flex-item entry-list-main">
              {entries}
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { entries } = reduxState.reducer;
  const { indicators } = reduxState.indicatorsReducer;
  const { mainChart } = reduxState.statsReducer;
  return {
    entries,
    indicators,
    mainChart
  };
};

const dispatchToProps = {
  updateEntries,
  updateIndicators,
  getMainChart
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Dashboard);
