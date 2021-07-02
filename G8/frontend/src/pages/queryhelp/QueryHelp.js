import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Row, Col, Card, Container } from "@themesberg/react-bootstrap";
import Code from "../../components/Code";
const importAll = (r) => r.keys().map(r);
const queryhelpMarkdownFiles = importAll(require.context("./", true, /\.md$/))
  .sort()
  .reverse();

const SarifHelp = () => {
  const { id } = useParams();
  const [file, setFile] = useState("");

  useEffect(() => {
    getMarkdownFiles();
    // eslint-disable-next-line
  }, [id]);

  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <Code code={String(children).replace(/\n$/, "")} language={match[1]} />
      ) : (
        // <SyntaxHighlighter style={dark} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const getMarkdownFiles = async () => {
    try {
      await fetch(queryhelpMarkdownFiles[id - 1].default)
        .then((res) => res.text())
        .then((data) => setFile(data))
        .catch((err) => console.error(err));
    } catch (error) {
      console.error(error);
    }

    // return queryHelpFile[id - 1];
    return id;
  };

  return (
    <Container className="px-0">
      <Row>
        <Col xs={12} className="p-3">
          <Card>
            <Card.Body>
              <ReactMarkdown components={components} children={file} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SarifHelp;
