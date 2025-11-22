import { getLinkByCode } from "../../action";
import LinkStatsClient from "./LinkStatsClient";

interface Params {
  params: {
    code: string;
  };
}

export default async function StatsPage({ params }: Params) {
    const { code } = await params; 
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

