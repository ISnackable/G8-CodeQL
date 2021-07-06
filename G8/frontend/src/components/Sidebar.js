import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  // faBoxOpen,
  faChartPie,
  // faCog,
  // faFileAlt,
  // faSignOutAlt,
  // faTable,
  faPen,
  faTimes,
  faSearch,
  faBug,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import {
  Nav,
  Badge,
  Image,
  Button,
  Dropdown,
  Accordion,
  Navbar,
} from "@themesberg/react-bootstrap";
import { Link } from "react-router-dom";

import { Routes } from "../routes";
// import ReactHero from "../assets/img/technologies/react-hero-logo.svg";
import G8Logo from "../assets/img/g8-logo.png";
// import ProfilePicture from "../assets/img/team/profile-picture-3.jpg";
const importAll = (r) => r.keys();
const queryhelpMarkdownFiles = importAll(
  require.context("../pages/queryhelp", true, /\.md$/)
)
  .sort()
  .reverse();

const Sidebar = (props = {}) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? "show" : "";

  const onCollapse = () => setShow(!show);

  const CollapsableNavItem = (props) => {
    const { eventKey, title, icon, children = null } = props;
    const defaultKey = pathname.indexOf(eventKey) !== -1 ? eventKey : "";

    return (
      <Accordion as={Nav.Item} defaultActiveKey={defaultKey}>
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Button
            as={Nav.Link}
            className="d-flex justify-content-between align-items-center"
          >
            <span>
              <span className="sidebar-icon">
                {icon?.length && <FontAwesomeIcon icon={icon} />}
              </span>
              <span className="sidebar-text">{title}</span>
            </span>
          </Accordion.Button>
          <Accordion.Body className="multi-level">
            <Nav className="flex-column">{children}</Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    );
  };

  const NavItem = (props) => {
    const {
      title,
      link,
      external,
      target,
      icon,
      image,
      badgeText,
      badgeBg = "secondary",
      badgeColor = "primary",
    } = props;
    const classNames = badgeText
      ? "d-flex justify-content-start align-items-center justify-content-between"
      : "";
    const navItemClassName = link === pathname ? "active" : "";
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className="sidebar-icon">
                <FontAwesomeIcon icon={icon} />{" "}
              </span>
            ) : null}
            {image ? (
              <Image
                src={image}
                width={20}
                height={20}
                className="sidebar-icon svg-icon"
              />
            ) : null}

            <span className="sidebar-text">{title}</span>
          </span>
          {badgeText ? (
            <Badge
              pill
              bg={badgeBg}
              text={badgeColor}
              className="badge-md notification-count ms-2"
            >
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar
        expand={false}
        collapseOnSelect
        variant="dark"
        className="navbar-theme-primary px-4 d-md-none"
      >
        <Navbar.Brand
          className="me-lg-5"
          as={Link}
          to={Routes.Presentation.path}
        >
          <Image src={G8Logo} alt="G8 Logo" className="navbar-brand-light" />
        </Navbar.Brand>
        <Navbar.Toggle
          as={Button}
          aria-controls="main-navbar"
          onClick={onCollapse}
        >
          <span className="navbar-toggler-icon" />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames="sidebar-transition">
        <SimpleBar
          className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}
        >
          <div className="sidebar-inner px-4 pt-3">
            <div className="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
              <div className="d-flex align-items-center">
                {/* <div className="user-avatar lg-avatar me-4">
                  <Image
                    src={ProfilePicture}
                    className="card-img-top rounded-circle border-white"
                  />
                </div>
                <div className="d-block">
                  <h6>Hi, Jane</h6>
                  <Button
                    as={Link}
                    variant="secondary"
                    size="xs"
                    to={Routes.Signin.path}
                    className="text-dark"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />{" "}
                    Sign Out
                  </Button>
                </div> */}
              </div>
              <Nav.Link
                className="collapse-close d-md-none"
                onClick={onCollapse}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className="flex-column pt-3 pt-md-0 text-truncate">
              <NavItem
                title="G8"
                link={Routes.Presentation.path}
                image={G8Logo}
              />
              <NavItem
                title="Dashboard"
                link={Routes.Dashboard.path}
                icon={faChartPie}
              />
              <NavItem
                title="Overview"
                link={Routes.Overview.path}
                icon={faCodepen}
              />
              <NavItem
                title="CodeQL Alerts"
                icon={faBug}
                link={Routes.CodeQLAlerts.path}
              />
              <NavItem
                title="Custom Query"
                icon={faPen}
                link={Routes.CustomQuery.path}
              />
              {/* 
              <NavItem
                external
                title="Plugins"
                link="/#/plugins/charts"
                target="_blank"
                badgeText="Pro"
                icon={faChartPie}
              /> */}

              <Dropdown.Divider className="my-3 border-indigo" />

              <NavItem
                title="PDF Generator"
                icon={faFilePdf}
                link={Routes.PDFGenerator.path}
              />

              <NavItem
                title="Sarif Viewer"
                icon={faSearch}
                link={Routes.SarifViewer.path}
              />

              <Dropdown.Divider className="my-3 border-indigo" />

              {/* 
              <NavItem
                title="Settings"
                icon={faCog}
                link={Routes.Settings.path}
              /> */}

              <CollapsableNavItem
                eventKey="documentation/"
                title="Documentation"
                icon={faBook}
              >
                <NavItem title="About G8" link={Routes.DocsAbout.path} />
                {/* <NavItem
                  title="Getting Started"
                  link={Routes.DocsQuickStart.path}
                /> */}
                <NavItem
                  title="Exploring G8"
                  link={Routes.DocsExploring.path}
                />
                <NavItem title="FAQ" link={Routes.DocsFAQ.path} />
                <NavItem title="Glossary" link={Routes.DocsGlossary.path} />
                <NavItem title="Build Tools" link={Routes.DocsBuild.path} />
                <NavItem title="Changelog" link={Routes.DocsChangelog.path} />
              </CollapsableNavItem>

              <CollapsableNavItem
                eventKey="queryhelp/"
                title="Query Help"
                icon={faBook}
              >
                {queryhelpMarkdownFiles.map((file, idx) => (
                  <NavItem
                    key={idx}
                    title={file
                      .split("/")
                      .pop()
                      .replace(".md", "")
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                    link={`/query-help/${idx + 1}`}
                  />
                ))}
              </CollapsableNavItem>

              {/* <CollapsableNavItem
                eventKey="tables/"
                title="Tables"
                icon={faTable}
              >
                <NavItem
                  title="Bootstrap Table"
                  link={Routes.BootstrapTables.path}
                />
              </CollapsableNavItem>
              <CollapsableNavItem
                eventKey="examples/"
                title="Page Examples"
                icon={faFileAlt}
              >
                <NavItem title="Sign In" link={Routes.Signin.path} />
                <NavItem title="Sign Up" link={Routes.Signup.path} />
                <NavItem
                  title="Forgot password"
                  link={Routes.ForgotPassword.path}
                />
                <NavItem
                  title="Reset password"
                  link={Routes.ResetPassword.path}
                />
                <NavItem title="Lock" link={Routes.Lock.path} />
                <NavItem title="404 Not Found" link={Routes.NotFound.path} />
                <NavItem
                  title="500 Server Error"
                  link={Routes.ServerError.path}
                />
              </CollapsableNavItem>

              <CollapsableNavItem
                eventKey="components/"
                title="Components"
                icon={faBoxOpen}
              >
                <NavItem title="Accordion" link={Routes.Accordions.path} />
                <NavItem title="Alerts" link={Routes.Alerts.path} />
                <NavItem title="Badges" link={Routes.Badges.path} />
                <NavItem
                  external
                  title="Widgets"
                  link="#"
                  target="_blank"
                  badgeText="Pro"
                />
                <NavItem title="Breadcrumbs" link={Routes.Breadcrumbs.path} />
                <NavItem title="Buttons" link={Routes.Buttons.path} />
                <NavItem title="Forms" link={Routes.Forms.path} />
                <NavItem title="Modals" link={Routes.Modals.path} />
                <NavItem title="Navbars" link={Routes.Navbars.path} />
                <NavItem title="Navs" link={Routes.Navs.path} />
                <NavItem title="Pagination" link={Routes.Pagination.path} />
                <NavItem title="Popovers" link={Routes.Popovers.path} />
                <NavItem title="Progress" link={Routes.Progress.path} />
                <NavItem title="Tables" link={Routes.Tables.path} />
                <NavItem title="Tabs" link={Routes.Tabs.path} />
                <NavItem title="Toasts" link={Routes.Toasts.path} />
                <NavItem title="Tooltips" link={Routes.Tooltips.path} />
              </CollapsableNavItem> */}
              {/* <NavItem
                external
                title="Themesberg"
                link="https://themesberg.com"
                target="_blank"
                image={ThemesbergLogo}
              /> */}
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
