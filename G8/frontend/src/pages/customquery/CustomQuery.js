import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextareaAutosize from 'react-textarea-autosize';
import AceEditor from 'react-ace'
// import mode-<language> , this imports the style and colors for the selected language.
import 'ace-builds/src-noconflict/mode-javascript'
// there are many themes to import, I liked monokai.
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/theme-eclipse'
import 'ace-builds/src-noconflict/theme-nord_dark'

import 'ace-builds/src-noconflict/theme-solarized_dark'


// this is an optional import just improved the interaction.
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/ext-beautify'


// Import React FilePond
import { FilePond } from "react-filepond";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import axios from "axios";
import {
  // faCashRegister,
  // faChartLine,
  faCloudUploadAlt,
  faPlus,
  faRocket,
  faTasks,
  faUserShield,
  faFolder,
  faQuestion,
  faArrowRight,

} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Button,
  Dropdown,
  ButtonGroup,
  Modal,
  Form,
} from "@themesberg/react-bootstrap";

// import {
//   CounterWidget,
//   CircleChartWidget,
//   // BarChartWidget,
//   // TeamMembersWidget,
//   // ProgressTrackWidget,
//   // RankingWidget,
//   SalesValueWidget,
//   // SalesValueWidgetPhone,
//   // AcquisitionWidget,
// } from "../../components/Widgets";
import { ExistingProjectTable } from "../../components/Tables";
// import { trafficShares } from "../../data/charts";
// import Code from "../../components/Code";


const CustomQuery = () => {
  const [code, setCode] = useState(`import javascript

from BlockStmt b
where b.getNumStmt() = 0
select b, "This is an empty block."`)

  
    return (
      <Card>
      <Card.Body>
        <article>
          <h1 className="h2" id="quick-start">
            Custom Query{" "}
          </h1>
          <p className="fs-5 fw-light">
            Create your own queries and run them against your own projects !
          </p>

          

        </article>
      
      <Row className="justify-content-md-center">

        <Col xs={12} sm={12} xl={12} className="mb-8">

        <div className = "w-100 p-3">
          {/* something about on clicks here  */}

        <label> Type in the box below </label>

        <AceEditor style={{
                height: '50vh',
                width: '100%',
              backgroundColor : 'light grey' ,  
           

          }}
            
            placeholder='Type your query here ! '
            mode='javascript'
            theme='nord_dark'
            name='basic-code-editor'
            onChange={currentCode => setCode(currentCode)}
            fontSize={18}
            showPrintMargin={true}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                tabSize: 4,
            }} />
        </div>

        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <Dropdown className="btn-toolbar">
            <Dropdown.Toggle
              as={Button}
              variant="primary"
              size="sm"
              className="me-2"
              style={{backgroundColor:"Green"}}
            >
              <FontAwesomeIcon icon={faArrowRight}  className="me-2" />
              Run Query 
            </Dropdown.Toggle>
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
              <Dropdown.Item className="fw-bold">
                <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" />{" "}
                Scan against my projects
              </Dropdown.Item>
              <Dropdown.Item className="fw-bold">
                <FontAwesomeIcon icon={faUserShield} className="me-2" /> Scan against Sample Projects
              </Dropdown.Item>
  
              <Dropdown.Divider />
  
            
            </Dropdown.Menu>
          </Dropdown>
  
        </div>
  
       </Col>
  
      </Row>
      </Card.Body>
      </Card>

      
    );

  
};

export default CustomQuery;
