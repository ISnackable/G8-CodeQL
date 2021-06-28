import React from "react";
import G8Logo from "../assets/img/g8-logo.png";
import CodeQLLogo from "../assets/img/codeql-logo.png";
import Roboto from "../assets/fonts/Roboto-Regular.ttf";
import html2canvas from "html2canvas";
import DOMPurify from "dompurify";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
  Link,
} from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import Snippet from "../components/Snippet";
import { createLocalStorageStateHook } from "use-local-storage-state";
import ReactDOMServer from "react-dom/server";

// Create styles
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

const importAll = (r) => r.keys().map(r);
const queryHelpMarkdownFiles = importAll(
  require.context("../pages/queryhelp", true, /\.md$/)
)
  .sort()
  .reverse();

// Create Document Component
const MyDocument = () => {
  const useLogs = createLocalStorageStateHook("log", []);
  const [logs, setLogs] = useLogs();

  const testingString = "TESTINGAWDAD";
  var today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;

  // Register font
  Font.register({
    family: "Roboto",
    src: Roboto,
  });

  const styles = StyleSheet.create({
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    title: {
      fontSize: 24,
      textAlign: "center",
      fontFamily: "Roboto",
    },
    author: {
      fontSize: 12,
      textAlign: "center",
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: "Roboto",
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Times-Roman",
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: "center",
      color: "grey",
    },
    pageNumber: {
      position: "absolute",
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: "center",
      color: "grey",
    },
  });

  const getMarkdownQueryHelp = async () => {
    const queryHelp = await Promise.all(
      queryHelpMarkdownFiles.map((file) =>
        fetch(file).then((res) => res.text())
      )
    ).catch((err) => console.error(err));

    console.log(queryHelp);
  };

  // As All Functions in js are asynchronus, to use await i am using async here
  const generateSnippetImage = async (html) => {
    let clean = DOMPurify.sanitize(html);
    var wrapper = document.getElementById("temp-snippet");
    wrapper.innerHTML = clean.replace(
      new RegExp(`ƩƩƩƩƩƩ(.*)ƩƩƩƩƩƩ`, "g"),
      `<code class="highlight-code">$1</code>`
    );
    var div = wrapper.firstChild;
    window.scrollTo(0, 0);

    // excute this function then exit loop
    let base64Image = await html2canvas(div, {
      scale: 1,
      scrollY: -window.scrollY,
    }).then(function (canvas) {
      wrapper.innerHTML = "";
      const imgData = canvas.toDataURL("image/png");
      return imgData;
    });

    return base64Image;
  };

  function renderMessageTextWithEmbeddedLinks(text, result) {
    if (text) {
      const rxLink = /\[([^\]]*)\]\(([^)]+)\)/; // Matches [text](id). Similar to below, but with an extra grouping around the id part.
      return text.match(rxLink)
        ? text.split(/(\[[^\]]*\]\([^)]+\))/g).map((item, i) => {
            if (i % 2 === 0) return item;
            // eslint-disable-next-line no-unused-vars
            const [_, text, id] = item.match(rxLink); // Safe since it was split by the same RegExp.
            return (
              <Link key={i} src={id} style={{ color: "#4B82BA" }}>
                {text}
              </Link>
            );
          })
        : text;
    }
  }

  const GetFindingDetails = () => {
    if (logs.length === 0) return <Text>Nothing</Text>;

    var results = logs[0].runs[0].results;
    var driverRules = logs[0].runs[0].tool.driver.rules;

    var tempSnippets = [];
    var grouped = {};
    for (let i = 0, len = results.length, r; i < len; i++) {
      r = results[i];
      // if (grouped[i] === undefined) grouped[i] = {};
      if (grouped[r.ruleId] === undefined) grouped[r.ruleId] = {};
      if (
        grouped[r.ruleId][
          r.locations[0].physicalLocation.artifactLocation.uri
        ] === undefined
      )
        grouped[r.ruleId][
          r.locations[0].physicalLocation.artifactLocation.uri
        ] = [];
      grouped[r.ruleId][
        r.locations[0].physicalLocation.artifactLocation.uri
      ].push(r);
    }

    var i = 0;
    for (const rule in grouped) {
      // console.log(`${rule}:`, grouped[rule]);
      let files = grouped[rule];
      // console.log(`${rule} has ${Object.keys(files).length} files`);
      for (const file in files) {
        i++;
        let alerts = files[file];
        let query = driverRules[alerts[0].ruleIndex].properties.name;
        let ruleId = driverRules[alerts[0].ruleIndex].id;
        let description = driverRules[alerts[0].ruleIndex].fullDescription.text;
        let severity =
          driverRules[alerts[0].ruleIndex].properties["problem.severity"];
        let tags = driverRules[alerts[0].ruleIndex].properties.tags;

        tempSnippets.push(
          <>
            <Text style={{ ...styles.subtitle, fontSize: 15 }} break>
              4.{i} {query}
            </Text>
            <Text
              style={[
                styles.text,
                {
                  marginVertical: 0,
                },
              ]}
            >
              Source File: {file}
            </Text>
            <Text>
              {alerts.map((alert, index) => {
                const ploc = alert.locations[0].physicalLocation;
                let html = ReactDOMServer.renderToStaticMarkup(
                  <Snippet
                    key={"s" + index}
                    ploc={ploc}
                    language="javascript"
                  ></Snippet>
                );

                let base64Image = generateSnippetImage(html);

                return (
                  <View>
                    <Image
                      style={[styles.image, { height: 500, width: 500 }]}
                      src={base64Image}
                    />
                    {"\n"}
                    <Text style={[styles.text, {}]}>
                      {renderMessageTextWithEmbeddedLinks(alert.message.text)}
                    </Text>
                    {"\n"}
                  </View>
                );
              })}
            </Text>
          </>
        );
      }
    }

    return <>{tempSnippets}</>;
  };

  function GetSummary() {
    if (logs.length === 0) return <Text>Nothing</Text>;

    var results = logs[0].runs[0].results;
    var driverRules = logs[0].runs[0].tool.driver.rules;

    // console.log(results);
    // console.log(driverRules);
    var noOfError = 0;
    var noOfWarnings = 0;
    var noOfRecommendation = 0;

    // for loop runs through all the reults and display the severity level within the properties .

    for (let i = 0; i < results.length; i++) {
      var severity =
        driverRules[results[i].ruleIndex].properties["problem.severity"];

      // incrementing the number of errors , warnings and recommendation which will be inputted
      // into the boxes at the top of the webpage

      if (severity === "error") {
        noOfError++;
      } else if (severity === "warning") {
        noOfWarnings++;
      } else if (severity === "recommendation") {
        noOfRecommendation++;
      }
    }

    // group the related alets together
    var grouped = {};
    for (let i = 0, len = results.length, r; i < len; i++) {
      r = results[i];
      // if (grouped[i] === undefined) grouped[i] = {};
      if (grouped[r.ruleIndex] === undefined) grouped[r.ruleIndex] = {};
      if (
        grouped[r.ruleIndex][
          driverRules[results[i].ruleIndex].properties["problem.severity"]
        ] === undefined
      )
        grouped[r.ruleIndex][
          driverRules[results[i].ruleIndex].properties["problem.severity"]
        ] = [];
      grouped[r.ruleIndex][
        driverRules[results[i].ruleIndex].properties["problem.severity"]
      ].push(driverRules[results[i].ruleIndex].properties["problem.severity"]);
    }

    // you can modifiy to return a
    var table = [];
    for (const ruleIndex in grouped) {
      var severity = Object.keys(grouped[ruleIndex])[0];
      var numberof = Object.values(grouped[ruleIndex])[0].length;
      var alertdetected = driverRules[ruleIndex].properties["name"];

      table.push({
        severity: severity,
        numberof,
        numberof,
        alertdetected,
        alertdetected,
      });
    }

    return (
      <>
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#E4E4E4",
            marginBottom: 10,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.text, { color: "#FF6469", fontWeight: "bold" }]}
            >
              {noOfError} Errors
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.text, { color: "#faa307", fontWeight: "bold" }]}
            >
              {noOfWarnings} Warnings
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[styles.text, { color: "#21897E", fontWeight: "bold" }]}
            >
              {noOfRecommendation} Recommendation
            </Text>
          </View>
        </View>
        <Table data={table}>
          <TableHeader>
            <TableCell style={[styles.text, { margin: 5 }]}>
              Alert Detected
            </TableCell>
            <TableCell style={[styles.text, { margin: 5 }]}>Severity</TableCell>
            <TableCell style={[styles.text, { margin: 5 }]}>#</TableCell>
          </TableHeader>
          <TableBody>
            <DataTableCell
              getContent={(r) => r.alertdetected}
              style={[styles.text, { margin: 5 }]}
            />
            <DataTableCell
              getContent={(r) => r.severity}
              style={[styles.text, { margin: 5 }]}
            />
            <DataTableCell
              getContent={(r) => r.numberof}
              style={[styles.text, { margin: 5 }]}
            />
          </TableBody>
        </Table>
        <Text style={styles.text}>Description: {"description"}</Text>
        <Text style={styles.text}>Query ID: {"ruleId"}</Text>
        <Text style={styles.text}>Language: JavaScript</Text>
        <Text style={styles.text}>Severity: {"severity"}</Text>
        <Text style={styles.text}>Tags: {"tags.join(', ')"}</Text>

        <Text style={styles.text}>
          AngularJS is secure by default through automated sanitization and
          filtering of untrusted values that could cause vulnerabilities such as
          XSS. Strict Contextual Escaping (SCE) is an execution mode in
          AngularJS that provides this security mechanism.
        </Text>
        <Text style={styles.text}>
          Disabling SCE in an AngularJS application is strongly discouraged. It
          is even more discouraged to disable SCE in a library, since it is an
          application-wide setting.
        </Text>
        <Text style={styles.text}>Do not disable SCE.</Text>
        <Text style={styles.text}>
          The following example shows an AngularJS application that disables SCE
          in order to dynamically construct an HTML fragment, which is later
          inserted into the DOM through $scope.html.
        </Text>
        <Text style={styles.text}>
          This is problematic, since it disables SCE for the entire AngularJS
          application.
        </Text>
        <Text style={styles.text}>
          Instead, just mark the dynamically constructed HTML fragment as safe
          using $sce.trustAsHtml, before assigning it to $scope.html:
        </Text>
        <Text style={styles.text}>
          Please note that this example is for illustrative purposes only; use
          the AngularJS templating system to dynamically construct HTML when
          possible.
        </Text>
      </>
    );
  }

  if (!logs.length) {
    return (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            ~ G8 Code Scanner ~
          </Text>
          <Text style={styles.title}>Load in a project first</Text>
          <Text style={styles.author}>Generated by: G8</Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          ~ G8 Code Scanner ~
        </Text>
        <Text style={styles.title}>Insert Project Name</Text>
        <Text style={styles.author}>Generated by: G8</Text>
        <Image style={styles.image} src={CodeQLLogo} />
        <Text style={styles.subtitle} break>
          1. The Code Review Process {testingString}
        </Text>
        <Text style={styles.text}>
          A Secure Code Review is a specialized task with the goal of
          identifying types of weaknesses that exist within a given code base.
          The task involves both manual and automated review of the underlying
          source code and identifies specific issues that may be representative
          of broader classes of weakness inherent in the code. A Secure Code
          Review does not attempt to identify every issue in the code, but
          instead attempts to identify types of risk within the code such that
          mitigation strategies can be devised.
        </Text>
        <Text style={styles.text}>
          During the actual review, members of a review team review the
          application code for security problems and categorize the findings
          based on the weakness categories (e.g., authentication, authorization,
          etc.). Each finding is assigned a risk rating of High, Medium, Low, or
          Informational. These findings and the broader weakness classes that
          they represent are presented in this final report that the development
          team can use as the foundation for improving the overall quality of
          the code base.
        </Text>
        <Text style={styles.text}>
          It should be noted that while the review process will be as thorough
          as possible in finding and reporting security weaknesses, it is not
          guaranteed to always find every possible weakness. If no issues are
          found, the review does not implicitly certify that the application is
          100-percent “hack proof.”
        </Text>
        <Text style={styles.text}>
          A Secure Code Review is not a silver bullet, but instead is a strong
          part of an overall risk mitigation program to protect an application.
        </Text>

        <Text style={styles.subtitle} break>
          2. Review Summary
        </Text>
        <Text style={styles.text}>
          The secure code review of the ### was completed on {today} by a review
          team consisting of ### and ###. The review was performed on code
          obtained from ### via email attachment on {today}, and bundled under
          the file named example_app_v2.tar.gz. A meeting between the review
          team, ### and ### was held on {today}, at which time information about
          the code structure was presented along with high level overviews of
          how things like authentication, data validation, and logging were
          implemented in the code. This information was used by the review team
          to formulate a plan for the impending review. The actual review
          involved a manual investigation of the Java code. Specific source
          files were not assigned to individual members; rather, each member of
          the review team attempted to review the entire application. Each
          reviewer recorded their specific findings within a spreadsheet and
          assigned risk levels as they felt appropriate. At the end of the
          review, the team looked across the individual spreadsheets to compare
          common findings and to perform group reviews of the uncommon findings.
          The specific findings are presented in the next section.
        </Text>
        <Text style={styles.subtitle} break>
          3. Finding Summary
        </Text>
        <Image style={styles.image} src={G8Logo} />
        <Text style={styles.text}>
          This section provides a summary of the findings resulting from this
          review.
        </Text>
        <Text style={styles.text}>
          For this application, three high level issues were found related to
          the areas of authentication and data validation. One of the high level
          issues resulting from unvalidated attacker input being sent to the
          JSON parse function could result in arbitrary commands being executed.
          Mitigating actions should be considered. Some other medium and low
          issues have also been found. Details are given below.
        </Text>
        <Text style={styles.text}>
          The figures below graphically outline the review team's findings by
          both category and risk level.
        </Text>
        <GetSummary />
        <Text style={styles.subtitle} break>
          4. Finding Details
        </Text>
        <Text style={styles.text}>
          This section provides details about the specific weaknesses that were
          found during the review. These details are designed to provide the
          developers with proof that the stated weaknesses exist as well as to
          provide examples that the developers can use to find and fix similar
          areas of the code. As mentioned before, the Secure Code Review does
          not claim to find every issue; as such the development team should use
          the information in these findings as an opportunity to improve the
          entire code base. Just fixing the specific examples identified below
          will most likely not remove the higher level risks from the
          application.
        </Text>
        <Text style={styles.text}>
          Each finding is given a qualitative risk rating assigned by the
          reviewers at the time of the review. The general guidelines used when
          assigning risk levels are as follows:
        </Text>
        <Text
          style={[
            styles.text,
            {
              marginVertical: 0,
              marginLeft: 25,
              marginBottom: 5,
            },
          ]}
        >
          • Error — Serious impact to the application security, generally
          unmitigated, large-scale issues, such as an attack that is currently
          exploitable from the Internet.
        </Text>
        <Text
          style={[
            styles.text,
            {
              marginVertical: 0,
              marginLeft: 25,
              marginBottom: 5,
            },
          ]}
        >
          • Warning — Notable impact to the application security, or somewhat
          mitigated high risks (e.g., being available only to the user's
          Intranet).
        </Text>
        <Text
          style={[
            styles.text,
            {
              marginVertical: 0,
              marginLeft: 25,
              marginBottom: 15,
            },
          ]}
        >
          • Recommendation — Potential impact to the application security, or
          heavily mitigated high risk (e.g., being in dead code or after an
          abort call). • Informational – Does not directly make the code less
          secure, but bad coding practice
        </Text>
        <Text style={styles.text}>
          The risk ratings should be considered risks to the application itself.
          In other words, the risk that the application behavior could be
          subverted in an unintended way could lead to a possible compromise.
          This information should then be used by the appropriate teams
          (developers/management/Information Security) in conjunction with the
          additional 'big picture' information that they have, to make the
          appropriate risk mitigation decisions
        </Text>
        <GetFindingDetails />
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default MyDocument;
