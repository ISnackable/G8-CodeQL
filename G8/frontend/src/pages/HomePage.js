import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Routes } from "../routes";

// pages
import Presentation from "./Presentation";
import Overview from "./overview/Overview";
import Dashboard from "./dashboard/Dashboard";
import CodeQLAlerts from "./CodeQLAlerts";
import CustomQuery from "./customquery/CustomQuery";
import SarifViewer from "./SarifViewer";
import PDFGenerator from "./PDFGenerator";
import NotFoundPage from "./NotFound";
import ServerError from "./ServerError";
import QueryHelp from "./queryhelp/QueryHelp";

// documentation pages
import DocsAbout from "./documentation/DocsAbout";
import DocsExploring from "./documentation/DocsExploring";
import DocsQuickStart from "./documentation/DocsQuickStart";
import DocsFAQ from "./documentation/DocsFAQ";
import DocsGlossary from "./documentation/DocsGlossary";
import DocsBuild from "./documentation/DocsBuild";
import DocsChangelog from "./documentation/DocsChangelog";

// components
import Sidebar from "../components/Sidebar";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Might want to shorten time of "fake loading"
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Might want to shorten time of "fake loading"
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Component {...props} />
          </main>
        </>
      )}
    />
  );
};

const HomePage = () => (
  <Switch>
    <RouteWithLoader
      exact
      path={Routes.Presentation.path}
      component={Presentation}
    />
    <RouteWithLoader
      exact
      path={Routes.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={Routes.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar exact path={Routes.Overview.path} component={Overview} />
    <RouteWithSidebar
      exact
      path={Routes.Dashboard.path}
      component={Dashboard}
    />
    <RouteWithSidebar
      exact
      path={Routes.CodeQLAlerts.path}
      component={CodeQLAlerts}
    />
    <RouteWithSidebar
      exact
      path={Routes.PDFGenerator.path}
      component={PDFGenerator}
    />
    <RouteWithSidebar
      exact
      path={Routes.SarifViewer.path}
      component={SarifViewer}
    />
    <RouteWithSidebar
      exact
      path={Routes.CustomQuery.path}
      component={CustomQuery}
    />

    {/* documentation */}
    <RouteWithSidebar
      exact
      path={Routes.DocsAbout.path}
      component={DocsAbout}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsQuickStart.path}
      component={DocsQuickStart}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsExploring.path}
      component={DocsExploring}
    />
    <RouteWithSidebar exact path={Routes.DocsFAQ.path} component={DocsFAQ} />
    <RouteWithSidebar
      exact
      path={Routes.DocsGlossary.path}
      component={DocsGlossary}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsBuild.path}
      component={DocsBuild}
    />
    <RouteWithSidebar
      exact
      path={Routes.DocsChangelog.path}
      component={DocsChangelog}
    />
    <RouteWithSidebar
      exact
      path={Routes.QueryHelp.path}
      component={QueryHelp}
    />

    <Redirect to={Routes.NotFound.path} />
  </Switch>
);

export default HomePage;
