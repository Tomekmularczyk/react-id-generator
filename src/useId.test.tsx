import React from "react";
import ReactDOM from "react-dom";
import { renderIntoDocument, act } from "react-dom/test-utils";
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

  test("generates single id with no arguments", () => {
    let idList: string[] = [];
    const Component = () => {
      idList = useId();
      return null;
    };

    renderIntoDocument(<Component />);

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id1");
  });

  test("generates more ids when passing count", () => {
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

  test("takes prefix", () => {
    let idList: string[] = [];
    const Component = () => {
      idList = useId(1, "test-");
      return null;
    };

    renderIntoDocument(<Component />);

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("test-1");
  });

  test("returns the same id's list across rerenders", () => {
    let idList: string[] = [];
    const Component = ({ idsCount }: { idsCount: number }) => {
      idList = useId(idsCount);
      return null;
    };

    act(() => {
      ReactDOM.render(<Component idsCount={1} />, container);
    });
    act(() => {
      ReactDOM.render(<Component idsCount={2} />, container);
    });
    act(() => {
      ReactDOM.render(<Component idsCount={3} />, container);
    });

    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id1");
  });

  test("returns new id's list when dependencies change", () => {
    let idList: string[] = [];
    const Component = ({ idsCount }: { idsCount: number }) => {
      idList = useId(idsCount, null, [idsCount]);
      return null;
    };

    act(() => {
      ReactDOM.render(<Component idsCount={1} />, container);
    });
    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id1");

    act(() => {
      ReactDOM.render(<Component idsCount={2} />, container);
    });
    expect(idList.length).toBe(2);
    expect(idList[0]).toBe("id2");
    expect(idList[1]).toBe("id3");

    // nothing changed
    act(() => {
      ReactDOM.render(<Component idsCount={2} />, container);
    });
    expect(idList.length).toBe(2);
    expect(idList[0]).toBe("id2");
    expect(idList[1]).toBe("id3");

    act(() => {
      ReactDOM.render(<Component idsCount={1} />, container);
    });
    expect(idList.length).toBe(1);
    expect(idList[0]).toBe("id4");
  });
});
