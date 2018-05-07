import React from "react";
import ReactDOM from "react-dom";
import Pager from "index";
import { shallow, mount, configure } from "enzyme";
import sinon from "sinon";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Pager", () => {
  xit("raises pageChanged", () => {
    //https://github.com/airbnb/enzyme/blob/master/docs/future.md

    //const clickCallback = sinon.spy();
    let onClick = jest.fn();
    const pager = mount(
      <Pager pageChanged={onClick} totalPages={5} totalDisplayed={5} />
    );

    const event = {
      preventDefault: function() {
        return;
      },
      target: {
        getAttribute: function(val) {
          if (val === "href") {
            return 1;
          }
        }
      }
    };

    pager
      .find("a[href=1]")
      .props()
      .onClick(event);

    //console.log(pager.find("a[href=1]").html());

    expect(onClick.mock.calls.length).toBe(1);
    //sinon.assert.calledWith(1);
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
