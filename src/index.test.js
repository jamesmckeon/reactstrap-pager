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
    ReactDOM.render(
      <Pager
        totalPages={5}
        totalDisplayed={5}
        pageChanged={() => {
          return;
        }}
      />,
      div
    );
  });
});

describe("Pager", () => {
  it("raises pageChanged", () => {
    let pageNumber;

    var onPageChanged = function(page) {
      pageNumber = page;
    };

    const pager = mount(
      <Pager pageChanged={onPageChanged} totalPages={5} totalDisplayed={5} />
    );

    //there should only be one active page at any one time
    pager.find(".active").simulate("click");

    expect(pageNumber).toEqual(1);
  });

  it("renders one active PaginationItem", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const activeItems = pager.find(".active");

    expect(activeItems.length).toEqual(1);
  });

  it("renders totalDisplayed", () => {
    const totalDisplayed = 3;
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={totalDisplayed}
      />
    );

    const items = pager.find(".page-item");

    //should render 5 items - 3 as per totalDisplayed plus back and forward controls
    expect(items.length).toEqual(totalDisplayed + 2);
  });

  it("activates first page", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const activeLink = pager.find(".page-item.active").childAt(0);
    //link with text "1" should be active on initial render
    expect(activeLink.text()).toEqual("1");
  });

  it("activates link on click", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const link = pager.find('a[href="2"]');

    pager.find("a").forEach(l => {
      console.log(l.text());
    });
    //console.log(links);
    // console.log(link);
    //link with text "1" should be active on initial render
    expect(activeLink.text()).toEqual("1");
  });
});
