import React from "react";

import PageHeader from "../page-header/PageHeader";

const LoadingPage = () => {
    return (
        <React.Fragment>
            <PageHeader page={`MAIN_PAGE`}/>
            <h1 className="load">Загрузка данных...</h1>
        </React.Fragment>
    );
};

export default LoadingPage;