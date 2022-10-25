import { Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import MainPage from "./components/main-page/MainPage";
import ArticlePage from "./components/article-page/ArticlePage";
import ErrorPage from "./components/error-page/ErrorPage";

import history from "./history";
import { RootState } from "./reducer/reducer";

interface AppProps {
  errorMessage: string,
  activeArticle: number | null,
}

const App: React.FC<AppProps> = ({ errorMessage, activeArticle }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" render={() => !errorMessage ? <MainPage/> : <ErrorPage />}>
        </Route>
        <Route exact strict path="/:id" render={renderProps => {
          const articleId = parseInt(renderProps.match.params.id, 10);

          return !errorMessage && activeArticle !== -1 ? <ArticlePage id={articleId}/> : 
            <ErrorPage />;
        }}>
        </Route>
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.errorMessage,
  activeArticle: state.activeArticle,
});

export default connect(mapStateToProps)(App);