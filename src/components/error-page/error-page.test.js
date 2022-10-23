import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore} from "redux";

import ErrorPage from "./ErrorPage";

import history from "../../history";
import {reducer} from "../../reducer/reducer";

it(`Error screen renders correctly`, () => {
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <Router history={history}>
                    <ErrorPage/>
                </Router>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});