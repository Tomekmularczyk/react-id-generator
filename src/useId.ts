import React from "react";
import nextId from "./nextId";

const getIds = (count: number, prefix?: string) => {
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

export default function useId(count = 1, prefix?: string): string[] {
  const idsListRef = React.useRef<string[]>([]);
  const prevCount = usePrevious(count);
  const prevPrefix = usePrevious(prefix);

  if (count !== prevCount || prevPrefix !== prefix) {
    idsListRef.current = getIds(count, prefix);
  }

  return idsListRef.current;
}
