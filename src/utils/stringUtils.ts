export function extractDimensionsFromPath(path: string) {
  const match = path.match(/(\d+-\d+)/);

  if (!match) {
    return { width: null, height: null };
  }
  const numberPart = match[0];
  const [width, height] = numberPart.split("-");
  return { width: width, height: height };
}
