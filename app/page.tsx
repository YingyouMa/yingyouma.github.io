import { HomeHero } from "../components/home-hero";
import { ProjectsListing } from "../components/projects-listing";

export default function Home() {
  return (
    <>
      <HomeHero />
      <ProjectsListing home />
    </>
  );
}
