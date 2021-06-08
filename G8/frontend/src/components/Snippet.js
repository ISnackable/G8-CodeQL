import React, { useState, useEffect, useRef } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Card,
  Button,
  Tooltip,
  OverlayTrigger,
} from "@themesberg/react-bootstrap";
import Highlight, { Prism } from "prism-react-renderer";
import themeStyle from "../assets/syntax-themes/ghcolors.json";
import DOMPurify from "dompurify";

export default (props) => {
  const { ploc, language = "javascript" } = props;
  const [copied, setCopied] = useState(false);
  const elementRef = useRef(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!ploc) return null;
  const { region, contextRegion } = ploc;
  const crst = contextRegion.snippet.text;

  let lines = crst.split("\n");
  const minLeadingWhitespace = Math.min(
    ...lines
      .filter((line) => line.trimLeft().length) // Blank lines often have indent 0, so throwing these out.
      .map((line) => line.match(/^ */)[0].length)
  );
  lines = lines.map((line) => line.slice(minLeadingWhitespace));

  let {
    startLine,
    startColumn = 0,
    endLine = startLine,
    endColumn = Number.MAX_SAFE_INTEGER,
  } = region; // Artibrary large value.
  startLine -= contextRegion.startLine;
  startColumn = Math.max(0, startColumn - 1 - minLeadingWhitespace);
  endLine -= contextRegion.startLine;
  endColumn = Math.max(0, endColumn - minLeadingWhitespace);

  // Insert start stop markers.
  const marker = "\u200B";
  lines[startLine] =
    lines[startLine].slice(0, startColumn) +
    marker +
    lines[startLine].slice(startColumn);
  lines[endLine] =
    lines[endLine].slice(0, endColumn) +
    marker +
    lines[endLine].slice(endColumn);

  const [pre, hi, post] = lines.join("\n").split(marker);
  const code = `${pre}ƩƩƩƩƩƩ${hi}ƩƩƩƩƩƩ${post}`;

  const SuperHighlighter = ({ children, delimeter = "ƩƩƩƩƩƩ" }) => {
    useEffect(() => {
      const element = elementRef.current;

      if (element) {
        const html = element.innerHTML;

        // Doing some sanitization, maybe should use escape instead of DOMPurify
        let clean = DOMPurify.sanitize(html);

        element.innerHTML = clean.replace(
          new RegExp(`${delimeter}(.*)${delimeter}`, "g"),
          `<span class="highlight-code">$1</span>`
        );
      }
    }, [delimeter, elementRef]);

    return <div ref={elementRef}>{children}</div>;
  };

  const CodeStyling = ({
    className,
    style,
    tokens,
    getLineProps,
    getTokenProps,
  }) => (
    <Card className="position-relative pe-5 mb-2">
      <Card.Body>
        <pre className={className} style={style}>
          {tokens.map((line, i) => {
            if (contextRegion.startLine) i += contextRegion.startLine;
            let lineProps = getLineProps({ line, key: i });
            // if (shouldHighlightLine(i)) {
            //   lineProps.className = `${lineProps.className} highlight-line`;
            // }

            return (
              <div {...lineProps}>
                {i}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {line.map((token, key) => {
                  let tokenProps = getTokenProps({ token, key });
                  return <span {...tokenProps} />;
                })}
              </div>
            );
          })}
        </pre>

        {copied ? (
          <span className="text-success copy-code-text">Copied</span>
        ) : null}

        <OverlayTrigger
          trigger={["hover", "focus"]}
          placement="top"
          overlay={<Tooltip>Copy to clipboard</Tooltip>}
        >
          <CopyToClipboard
            text={code.replace(new RegExp(`ƩƩƩƩƩƩ(.*)ƩƩƩƩƩƩ`, "g"), ``)}
            onCopy={handleCopy}
          >
            <Button size="sm" variant="primary" className="copy-code-button">
              Copy
            </Button>
          </CopyToClipboard>
        </OverlayTrigger>
      </Card.Body>
    </Card>
  );

  return (
    <SuperHighlighter delimeter="ƩƩƩƩƩƩ">
      <Highlight
        Prism={Prism}
        code={code}
        language={language}
        theme={themeStyle}
      >
        {CodeStyling}
      </Highlight>
    </SuperHighlighter>
  );
};
