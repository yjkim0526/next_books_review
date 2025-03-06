export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  // const aboutBooks = await AboutBooks(q);

  return <div></div>;
}
