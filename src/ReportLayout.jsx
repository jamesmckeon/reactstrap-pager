import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import LoadingControl from "components/controls/LoadingControl";
import PrintProvider, { Print, NoPrint } from "react-easy-print";

const ReportPrinter = props => {
  return (
    <PrintProvider>
      {props.title && (
        <Print exclusive>
          <h3 className="text-center mb-4">{props.title}</h3>
        </Print>
      )}
      <Print>{props.children}</Print>
    </PrintProvider>
  );
};

ReportPrinter.propTypes = {
  title: PropTypes.string
};

ReportPrinter.defaultProps = {
  title: ""
};

const CenteredText = props => {
  return (
    <div className="text-center font-italic">
      <hr /> <h5>{props.text}</h5>
      <hr />
    </div>
  );
};

CenteredText.propTypes = {
  text: PropTypes.string
};

CenteredText.defaultProps = {
  text: "No matching records found"
};

const ReportBody = props => {
  return (
    <ReportPrinter title={props.printTitle}>
      <Row className="mt-4">
        <Col>
          {props.displayState === "loading" && <LoadingControl />}
          {props.displayState === "empty" && <CenteredText />}
          {props.displayState === "visible" && props.children}
        </Col>
      </Row>
    </ReportPrinter>
  );
};

ReportBody.propTypes = {
  printTitle: PropTypes.string,
  displayState: PropTypes.oneOf(["loading", "hidden", "empty", "visible"])
};

ReportBody.defaultProps = {
  displayState: "hidden"
};

export { CenteredText, ReportBody, ReportPrinter, NoPrint };
