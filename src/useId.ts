import React from "react";
import nextId from "./nextId";
import inputsAreEqual from "./inputsAreEqual";

const getIds = (count: number, prefix?: string | null) => {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push(nextId(prefix));
  }
  return ids;
};

function usePrevious(value: unknown) {
  const ref = React.useRef<unknown>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function useId(
  count: number = 1,
  prefix?: string | null,
  dependencies: unknown[] = []
) {
  const idsListRef = React.useRef<string[]>();
  const prevDependencies = usePrevious(dependencies);

  if (!idsListRef.current || !inputsAreEqual(prevDependencies, dependencies)) {
    idsListRef.current = getIds(count, prefix);
  }

  return idsListRef.current;
}
