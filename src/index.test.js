import React from "react";
import ReactDOM from "react-dom";
import Pager from "index";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
//Enzyme.configure({ adapter: new Adapter() });

describe("<index />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Pager />, div);
  });
});

describe("Pager", () => {
  it("raises pageChanged", () => {
    let changeRaised;

    var onPageChanged = function() {
      changeRaised++;
    };

    const pager = mount(
      <Pager onPageChanged={onPageChanged} totalPages={5} totalDisplayed={5} />
    );

    //there should only be one active page at any one time
    pager.find(".page-item.active").simulate("click");

    expect(changeRaised).toEqual(1);
  });
});
