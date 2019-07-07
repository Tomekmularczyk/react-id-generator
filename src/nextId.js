let globalPrefix = "id";
let lastId = 0;
export default function nextId(localPrefix) {
  lastId++;
  return `${localPrefix || globalPrefix}${lastId}`;
}

export const resetId = () => {
  lastId = 0;
};

export const setGlobalPrefix = (newPrefix = "id") => {
  globalPrefix = newPrefix;
};
