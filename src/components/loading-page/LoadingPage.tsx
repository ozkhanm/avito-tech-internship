import PageHeader from "../page-header/PageHeader";

import { PAGE, DATA_LOADING_MESSAGE } from "../../constants";

const LoadingPage = () => {
    return (
        <>
            <PageHeader page={PAGE.MAIN}/>
            <h1 className="load">{DATA_LOADING_MESSAGE}</h1>
        </>
    );
};

export default LoadingPage;