import React, { Component } from "react";
import "./Dashboard.scss";

import axios from "axios";

//lodash:
import _ from "lodash/fp";

//materialUI:
import Paper from "@material-ui/core/Paper";

//Redux:
import { connect } from "react-redux";
import { updateEntries, updateArticle } from "../../ducks/reducer";
import { updateIndicators } from "../../ducks/indicatorsReducer";

//Routes:
import { Switch, Route, Link } from "react-router-dom";
import Stats from "./Stats/Stats";
import Articles from "./Articles/Articles";

//Components:
import EntryDisplay from "../Dashboard/EntriesDisplay/EntriesDisplay";
import ArticlesCard from "./Articles/ArticlesCard/ArticlesCard";
import MainChart from "./Stats/MainChart/MainChart"

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      id: 0,
      index: -1
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
        updateEntries,
        updateIndicators
      } = this.props
        let dbentries = await axios.get("/api/entries");
        updateEntries(dbentries.data);
      if (_.isEmpty(indicators)) {
        let dbIndicators = await axios.get("/api/indicators");
        dbIndicators = dbIndicators.data.map(indicator => {
          indicator.date = new Date(indicator.date);
          return indicator;
        });
        updateIndicators(dbIndicators);
      }

      // ------------------Articles ------------------///
      if (_.isEmpty(this.props.article.title)) {
        const apiKey = "6bc1156549ec47f3b0e638a9780c0167";
        let date = new Date();
        date.setDate(date.getDate() - 27);
        let newsApiArticles = await axios.get(
          `https://newsapi.org/v2/everything?q=headaches&+OR+fibromyalgia&+OR+fatigue&from=${date
          .toISOString()
          .substring(
            0,
            10
            )}&sortBy=publishedAt&to=2019-03-14&apiKey=${apiKey}&sources=medical-news-today`
            )
            let article =
            newsApiArticles.data.articles[
              Math.floor(
                Math.random() * Math.floor(newsApiArticles.data.articles.length)
            )]
            article.content = article.content.substring(261, article.length - 262)
            this.props.updateArticle(article)
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
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
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
          handleEntryView={this.handleEntryView}
          handleSelect={this.handleSelect}
        />
      )
    })
    return (
      <div>
        <Switch>
          <Route path="/day/dashboard/stats" component={Stats} />
          <Route path="/day/dashboard/article" exact component={Articles} />
        </Switch>
        {this.props.location.pathname === "/day/dashboard" && (
          <div className="dashboard-container">
            <div className="upper-container">
              <Paper className="flex-item stats-main" elevation={2}>
                <MainChart height={223} />
                <Link className="stats-link" to="/day/dashboard/stats">
                  View indicators stats
                </Link>
              </Paper>
              <ArticlesCard
                className="flex-item article-card"
                article={this.props.article}
              />
            </div>
            <Paper elevation={2} className="flex-item entry-list-main">
              <h4>Previous entries</h4>
              {entries}
            </Paper>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  const { entries, article } = reduxState.reducer
  const { indicators } = reduxState.indicatorsReducer
  return {
    entries,
    indicators,
    article
  }
}

const dispatchToProps = {
  updateEntries,
  updateIndicators,
  updateArticle
};

export default connect(
  mapStateToProps,
  dispatchToProps
)(Dashboard);
