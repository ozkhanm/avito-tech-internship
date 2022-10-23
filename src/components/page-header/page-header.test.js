import renderer from "react-test-renderer";
import { Router } from "react-router-dom";

import { PageHeader } from "./PageHeader";

import history from "../../history";
import { PAGE } from "../../constants";

it("Page header renders correctly on article page screen", () => {
    const tree = renderer
        .create(
            <Router history={history}>
                <PageHeader page={PAGE.ARTICLE}/>
            </Router>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});

it("Page header renders correctly on main page screen", () => {
    const tree = renderer
        .create(
            <Router history={history}>
                <PageHeader page={PAGE.MAIN}/>
            </Router>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});