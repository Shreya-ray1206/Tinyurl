import { getLinkByCode } from "../../action";
import LinkStatsClient from "./LinkStatsClient";

interface PageProps {
  params: Promise<{ code: string }>; // Next.js expects Promise for App Router
}

export default async function StatsPage({ params }: PageProps) {
  const { code } = await params; // await because params is a Promise

  const link = await getLinkByCode(code);

  if (!link) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">
        Link not found
      </div>
    );
  }

  return <LinkStatsClient link={link} />;
}
