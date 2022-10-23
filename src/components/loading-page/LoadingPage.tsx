import PageHeader from "../page-header/PageHeader";

import { PAGE } from "../../constants";

const LoadingPage = () => {
    return (
        <>
            <PageHeader page={PAGE.MAIN}/>
            <h1 className="load">Загрузка данных...</h1>
        </>
    );
};

export default LoadingPage;