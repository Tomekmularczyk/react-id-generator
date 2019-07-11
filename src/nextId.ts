let globalPrefix = "id";
let lastId = 0;
export default function nextId(localPrefix?: string): string {
  lastId++;
  return `${localPrefix || globalPrefix}${lastId}`;
}

export const resetId = (): void => {
  lastId = 0;
};

export const setGlobalPrefix = (newPrefix: string = "id"): void => {
  globalPrefix = newPrefix;
};
