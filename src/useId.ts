import React from "react";
import nextId from "./nextId";

const getIds = (count: number, prefix?: string | null) => {
  const ids = [];
  for (let i = 0; i < count; i++) {
    ids.push(nextId(prefix));
  }
  return ids;
};

function useDidUpdate() {
  const isUpdate = React.useRef(false);
  React.useEffect(() => {
    isUpdate.current = true;
  }, []);

  return isUpdate.current;
}

export default function useId(
  count: number = 1,
  prefix?: string | null,
  dependencies: unknown[] = []
) {
  const [idsList, setIdsList] = React.useState(() => getIds(count, prefix));
  const isUpdate = useDidUpdate();

  React.useEffect(() => {
    if (isUpdate) {
      setIdsList(getIds(count, prefix));
    }
  }, dependencies);

  return idsList;
}
