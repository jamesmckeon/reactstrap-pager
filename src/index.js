import React from "react";
import PropTypes from "prop-types";
import Pager from "reactstrap-pager";
import { Table, TableProps } from "reactstrap";

export const ColumnDef = {
  sortable: false,
  headerText: ""
};

const CenteredText = props => {
  return (
    <div className="text-center font-italic">
      <hr /> <h5>{props.text}</h5>
      <hr />
    </div>
  );
};

export default class ReactstrapTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.getColumns = this.getColumns.bind(this);
    this.getBody = this.getBody.bind(this);
  }

  getColumns() {
    //no columndefs provided, use first row in data
    const row = this.props.data[0];

    return Object.keys(row).map(r => {
      return { header: r, clickable: false };
    });
  }

  getBody() {
    return this.props.data.map(row => {
      return Object.keys(row).map(key => {
        return <td>{row[key]}</td>;
      });
    });
  }

  render() {
    return (
      !this.props.hidden && (
        <div>
          <div>
            (this.props.data && this.props.data.length > 0 &&
            <Table {...this.props}>
              <thead>
                <tr>
                  {this.getColumns.map(c => {
                    return <th>{c.header}</th>;
                  })}
                </tr>
              </thead>
              <tbody>{this.getBody()}</tbody>
            </Table>
          </div>
          <Pager />) (!this.props.data || this.props.data.length === 0 &&{" "}
          <CenteredText text={"No records"} />)
        </div>
      )
    );
  }
}

ReactstrapTable.propTypes = {
  hidden: PropTypes.bool
};
