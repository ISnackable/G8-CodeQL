import React, { useEffect, useRef } from "react";
import styled from "styled-components";
// import { Button } from "@themesberg/react-bootstrap";
import Highlight, { Prism } from "prism-react-renderer";
import themeStyle from "../assets/syntax-themes/ghcolors.json";
import DOMPurify from "dompurify";

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
`;

const Line = styled.div`
  display: table-row;
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span``;

const Snippet = (props) => {
  const { ploc, language = "javascript" } = props;
  const elementRef = useRef(null);

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
          `<code class="highlight-code">$1</code>`
        );
      }
    }, [delimeter]);

    return <div ref={elementRef}>{children}</div>;
  };

  return (
    <SuperHighlighter>
      <Highlight
        Prism={Prism}
        code={code}
        language={language}
        theme={themeStyle}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Pre className={className} style={style}>
            {tokens.map((line, i) => {
              if (contextRegion.startLine) i += contextRegion.startLine;
              return (
                <Line key={i} {...getLineProps({ line, key: i })}>
                  <LineNo>{i}</LineNo>
                  <LineContent>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token, key })} />
                    ))}
                  </LineContent>
                </Line>
              );
            })}
          </Pre>
        )}
      </Highlight>
    </SuperHighlighter>
  );
};

export default Snippet;
