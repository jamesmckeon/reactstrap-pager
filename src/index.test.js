import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Pager from "index";
import React from "react";
import sinon from "sinon";

configure({ adapter: new Adapter() });

describe("Pager", () => {
  beforeEach(() => {
    sinon.stub(console, "error");
  });

  afterEach(() => {
    console.error.restore();
  });

  it("validates totalPages required", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={null}
        totalDisplayed={5}
      />
    );

    sinon.assert.called(console.error);
    sinon.assert.calledWith(
      console.error,
      sinon.match("totalPages is required")
    );
  });

  it("validates totalPages >= totalDisplayed", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={6}
      />
    );

    sinon.assert.called(console.error);
    sinon.assert.calledWith(
      console.error,
      sinon.match("totalpages must be >= totalDisplayed")
    );
  });

  it("validates totalPages >= 2", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={1}
        totalDisplayed={1}
      />
    );

    sinon.assert.called(console.error);
    sinon.assert.calledWith(
      console.error,
      sinon.match("totalPages must be 2 or greater")
    );
  });

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

  it("enables move next on initial render", () => {
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

  it("disables move next on last page", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={4}
        totalDisplayed={3}
      />
    );

    const pageThree = pager.find("a[href=3]").at(0);

    const totalItems = pager.find(".page-item").length;
    const forwardItem = pager.find(".page-item").at(totalItems - 1);
    const nextLink = pager.find("a[aria-label='Next']").at(0);

    //activate page 3
    pageThree.simulate("click");

    //move next to activate last page
    nextLink.simulate("click");

    expect(nextLink.render().hasClass("disabled")).toEqual(true);
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

  //see activates expected page number on move next
  it("sets Current on page click", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const linkTwo = pager.find("a[href=2]").at(0);

    const current = () => {
      return pager.state("Current");
    };

    expect(current()).toEqual(1);

    linkTwo.simulate("click");
    expect(current()).toEqual(2);
  });

  //for whatever reason, enzyme doesn't inspect css class reliably
  //see https://github.com/airbnb/enzyme/issues/1177
  //id rather verify that page one link parent has class "active" on it
  //after back/previous link is clicked, but can't get it to work
  //so i'll just verify expected state
  it("activates expected page number on move previous", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const backLink = pager.find("a[aria-label='Previous']").at(0);

    const linkTwo = pager.find("a[href=2]").at(0);
    const linkOne = pager.find("a[href=1]").at(0);

    const current = () => {
      return pager.state("Current");
    };

    linkTwo.simulate("click");
    expect(current()).toEqual(2);

    backLink.simulate("click");
    expect(current()).toEqual(1);
  });

  //see activates expected page number on move next
  it("activates expected page number on move next", () => {
    const pager = mount(
      <Pager
        pageChanged={() => {
          return;
        }}
        totalPages={5}
        totalDisplayed={5}
      />
    );

    const nextLink = pager.find("a[aria-label='Next']").at(0);

    const linkTwo = pager.find("a[href=2]").at(0);
    const linkOne = pager.find("a[href=1]").at(0);

    const current = () => {
      return pager.state("Current");
    };

    expect(current()).toEqual(1);

    nextLink.simulate("click");
    expect(current()).toEqual(2);
  });
});
