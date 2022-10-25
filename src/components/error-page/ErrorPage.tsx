import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PageHeader from "../page-header/PageHeader";

import { PAGE } from "../../constants";
import { ActionCreator } from "../../reducer/action-creator";
import { AppDispatch, RootState } from "../../reducer/reducer";

interface ErrorPageProps {
    errorMessage: string,
    resetErrorMessage: () => void,
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage, resetErrorMessage }) => {
    return (
        <>
            <PageHeader page={PAGE.ARTICLE}/>
            <div className="container">
                <div className="load">
                    <h1>{ errorMessage }</h1>
                    <Link to={"/"} onClick={resetErrorMessage}>Return to main page</Link>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    errorMessage: state.errorMessage,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    resetErrorMessage() {
        dispatch(ActionCreator.setErrorMessage(""));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorPage);
export { ErrorPage };