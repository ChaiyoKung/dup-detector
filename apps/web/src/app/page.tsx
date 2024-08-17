import { Content } from "./_components/Content";
import { Header } from "./_components/Header";

export default function Index() {
  return (
    <>
      <Header />
      <main className="container max-w-4xl mx-auto px-2 flex flex-col gap-8 py-8">
        <Content />
      </main>
    </>
  );
}
