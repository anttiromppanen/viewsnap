export default async function getProjectRootFolder() {
  const { packageDirectory } = await import("pkg-dir");
  const folder = await packageDirectory();
  return folder;
}
