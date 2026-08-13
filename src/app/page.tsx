import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Socials } from "@/components/socials";
import { Projects } from "@/components/projects";
import { GitHubGraph } from "@/components/github-graph";
import { Blogs } from "@/components/blogs";
import { Learnings } from "@/components/learnings";
import { Footer } from "@/components/footer";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

export default function Home() {

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-10">
        <div className="space-y-16">
          {/* Hero + About + Socials form the intro block */}
          <div className="space-y-6">
            <Hero />
            <About />
            <Socials />
          </div>

          {/* Separator */}
          <hr className="border-dashed border-border/15" />

          {/* Projects */}
          <Projects />

          {/* GitHub Contributions */}
          <GitHubGraph />

          {/* Separator */}
          <hr className="border-dashed border-border/15" />

          {/* Quick Learnings */}
          <Learnings />

          {/* Separator */}
          {/* <hr className="border-dashed border-border/15" /> */}

          {/* Blogs */}
          <Blogs />
        </div>
      </main>
      <div className="mx-auto w-full max-w-3xl px-6 pb-20">
        <Footer />
      </div>

      {/* Progressive blur at bottom */}
      <ProgressiveBlur
        className="fixed bottom-0 left-0 right-0 z-30"
        position="bottom"
        height="80px"
      />
    </>
  );
}
