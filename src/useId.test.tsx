import React from "react";
import ReactDOM from "react-dom";
import { renderIntoDocument } from "react-dom/test-utils";
import useId from "./useId";
import { resetId } from "./nextId";

describe("useId", () => {
  let container: HTMLDivElement | null;

  beforeEach(() => {
    resetId();
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it("generates single id with no arguments", () => {
    let idList: string[] = [];
    const Component = () => {
      idList = useId();
      return null;
    };

    renderIntoDocument(<Component />);

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id1");
  });

  it("generates more ids when passing count", () => {
    let idList: string[] = [];
    const Component = () => {
      idList = useId(3);
      return null;
    };

    renderIntoDocument(<Component />);

    expect(idList.length).toBe(3);
    expect(idList[0]).toBe("id1");
    expect(idList[1]).toBe("id2");
    expect(idList[2]).toBe("id3");
  });

  it("takes prefix", () => {
    let idList: string[] = [];
    const Component = () => {
      idList = useId(1, "test-");
      return null;
    };

    renderIntoDocument(<Component />);

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("test-1");
  });

  it("returns the same id's list across rerenders", () => {
    let idList: string[] = [];
    const Component = ({ idsCount }: { idsCount: number }) => {
      idList = useId(idsCount);
      return null;
    };

    ReactDOM.render(<Component idsCount={1} />, container);
    ReactDOM.render(<Component idsCount={2} />, container);
    ReactDOM.render(<Component idsCount={3} />, container);

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id1");
  });

  it("returns new id's list when dependencies change", () => {
    let idList: string[] = [];
    const Component = ({ idsCount }: { idsCount: number }) => {
      idList = useId(idsCount, null, [idsCount]);
      return null;
    };

    ReactDOM.render(<Component idsCount={1} />, container);
    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id1");

    ReactDOM.render(<Component idsCount={2} />, container);
    expect(idList.length).toBe(2);
    expect(idList[0]).toBe("id2");
    expect(idList[1]).toBe("id3");

    // nothing had changed
    ReactDOM.render(<Component idsCount={2} />, container);
    expect(idList.length).toBe(2);
    expect(idList[0]).toBe("id2");
    expect(idList[1]).toBe("id3");

    ReactDOM.render(<Component idsCount={1} />, container);

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id4");
  });

  it("returns new id's immediately when dependencies change (in the same render)", () => {
    const idsRenderHistory: string[][] = [];
    const Component = ({ idsCount }: { idsCount: number }) => {
      const ids = useId(idsCount, null, [idsCount]);
      idsRenderHistory.push(ids);
      return null;
    };

    ReactDOM.render(<Component idsCount={2} />, container);
    expect(idsRenderHistory).toHaveLength(1);
    expect(idsRenderHistory[0]).toEqual(["id1", "id2"]);

    ReactDOM.render(<Component idsCount={3} />, container);
    expect(idsRenderHistory).toHaveLength(2);
    expect(idsRenderHistory[1]).toEqual(["id3", "id4", "id5"]);
  });
});
