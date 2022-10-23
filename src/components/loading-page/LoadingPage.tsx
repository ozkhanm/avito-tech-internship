import PageHeader from "../page-header/PageHeader";

const LoadingPage = () => {
    return (
        <>
            <PageHeader page={"MAIN_PAGE"}/>
            <h1 className="load">Загрузка данных...</h1>
        </>
    );
};

export default LoadingPage;