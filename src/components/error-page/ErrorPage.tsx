import { Link } from "react-router-dom";

import PageHeader from "../page-header/PageHeader";

import { PAGE } from "../../constants";

const ErrorPage = () => {
    return (
        <>
            <PageHeader page={PAGE.ARTICLE}/>
            <div className="container">
                <div className="load">
                    <h1>Article does not exist</h1>
                    <Link to={"/"}>Return to main page</Link>
                </div>
            </div>
        </>
    );
};

export default ErrorPage;