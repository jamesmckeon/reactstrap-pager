import React from "react";
import ReactDOM from "react-dom";
import Pager from "index";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

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

  it("disables back button on initial render", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const pagination = pager.find(".pagination").at(0);
    const backItem = pagination.childAt(0);

    //link with text "1" should be active on initial render
    expect(backItem.render().hasClass("disabled")).toEqual(true);
  });

  it("enables back button", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const backItem = pager.find(".page-item").at(0);
    const linkTwo = pager.find("a[href=2]").at(0);

    linkTwo.simulate("click");

    //link with text "1" should be active on initial render
    expect(backItem.render().hasClass("disabled")).toEqual(false);
  });

  it("enables forward button on initial render", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={10}
        totalDisplayed={5}
      />
    );

    const totalItems = pager.find(".page-item").length;
    const forwardItem = pager.find(".page-item").at(totalItems - 1);

    expect(forwardItem.render().hasClass("disabled")).toEqual(false);
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

    const pageItem = pager
      .find(".page-item")
      .filterWhere(i => i.find("a[href=2]").length === 1);
    const link = pager.find("a[href=2]").at(0);

    link.simulate("click");

    //have to call render
    //https://github.com/airbnb/enzyme/issues/1177
    expect(pageItem.render().hasClass("active")).toEqual(true);
  });
});
