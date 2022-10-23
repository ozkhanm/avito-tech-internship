import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";

import {PageHeader} from "./PageHeader";

import history from "../../history";

it(`Page header renders correctly on article page screen`, () => {
    const tree = renderer
        .create(
            <Router history={history}>
                <PageHeader page={`ARTICLE_PAGE`}/>
            </Router>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});

it(`Page header renders correctly on main page screen`, () => {
    const tree = renderer
        .create(
            <Router history={history}>
                <PageHeader page={`MAIN_PAGE`}/>
            </Router>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});