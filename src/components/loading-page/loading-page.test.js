import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {createStore} from "redux";

import LoadingPage from "./LoadingPage";

import {reducer} from "../../reducer/reducer";

it(`Loading screen renders correctly`, () => {
    const tree = renderer
        .create(
            <Provider store={createStore(reducer)}>
                <LoadingPage/>
            </Provider>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});