import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import {ArticlePage} from "./ArticlePage";

import history from "../../history";
import {reducer} from "../../reducer/reducer";

it(`Article screen renders correctly if data is fetching`, () => {
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <ArticlePage isActiveArticleLoaded={false}/>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});

it(`Article screen renders correctly if data is loaded`, () => {
    const article = {
        "by" : "idletom",
        "descendants" : 0,
        "id" : 30406473,
        "score" : 1,
        "time" : 1645371191,
        "title" : "Technical Analysis of the DDoS Attacks Against Ukrainian Websites",
        "type" : "story",
        "url" : "https://www.cadosecurity.com/technical-analysis-of-the-ddos-attacks-against-ukrainian-websites/"
    };
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <Router history={history}>
                    <ArticlePage isActiveArticleLoaded={true} activeArticle={article} changeActiveArticleId={() => {}}/>
                </Router>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});

it(`Article screen renders correctly if error occured`, () => {
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <Router history={history}>
                    <ArticlePage isActiveArticleLoaded={false} activeArticle={-1} changeActiveArticleId={() => {}}/>
                </Router>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});