import dynamic from "next/dynamic";

const TeamPage = dynamic(() =>
  import("~/components/Team/TeamPage").then((mod) => mod.TeamPage),
);

export default function Page() {
  return <TeamPage />;
}
