import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {BrowserRouter} from 'react-router-dom';

import {MainPage} from "./MainPage";

import {reducer} from "../../reducer/reducer";

const articles= [
    {
        "by" : "yarapavan",
        "descendants" : 0,
        "id" : 30406481,
        "score" : 1,
        "time" : 1645371224,
        "title" : "How to Lose Time and Money",
        "type" : "story",
        "url" : "https://prachinain.medium.com/how-to-lose-time-and-money-e2d8c54c5c4d"
    },
    {
        "by" : "idletom",
        "descendants" : 0,
        "id" : 30406473,
        "score" : 1,
        "time" : 1645371191,
        "title" : "Technical Analysis of the DDoS Attacks Against Ukrainian Websites",
        "type" : "story",
        "url" : "https://www.cadosecurity.com/technical-analysis-of-the-ddos-attacks-against-ukrainian-websites/"
    },
    {
        "by" : "wrp",
        "descendants" : 1,
        "id" : 30406031,
        "kids" : [ 30406036 ],
        "score" : 2,
        "time" : 1645367930,
        "title" : "Absence of evidence is not evidence of absence: Bayesian view? (2021)",
        "type" : "story",
        "url" : "https://stats.stackexchange.com/questions/512678/absence-of-evidence-is-not-evidence-of-absence-what-does-bayesian-probability-h"
    }
];

it(`Main page renders correctly if data fetched`, () => {
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <BrowserRouter>
                    <MainPage articles={articles} isDataLoaded={true}/>
                </BrowserRouter>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
  
it(`Main page renders correctly if no data fetched`, () => {
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <BrowserRouter>
                    <MainPage articles={[]} isDataLoaded={false}/>
                </BrowserRouter>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});