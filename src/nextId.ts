let globalPrefix = "id";
let lastId = 0;
export default function nextId(localPrefix?: string | null): string {
  lastId++;
  return `${localPrefix || globalPrefix}${lastId}`;
}

export const resetId = (): void => {
  lastId = 0;
};

export const setPrefix = (newPrefix: string): void => {
  globalPrefix = newPrefix;
};
