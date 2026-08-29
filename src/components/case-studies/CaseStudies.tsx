import { projects } from "../../data/projects";
import { TextReveal } from "../../animations/TextReveal";
import { ScrollReveal } from "../../animations/ScrollReveal";
import { ScrollScale } from "../../animations/ScrollScale";
import { CaseStudyVisual } from "./CaseStudyVisual";

export function CaseStudies() {
  return (
    <section className="section case-studies" id="work">
      <div className="container">
        <TextReveal as="h2" className="h-1 case-studies__title" lines={["SELECTED SYSTEMS"]} />

        <div className="case-studies__list">
          {projects.map((project, i) => (
            <article
              className={`case-study ${i % 2 === 1 ? "case-study--reverse" : ""}`}
              key={project.id}
            >
              <ScrollReveal x={i % 2 === 1 ? 40 : -40} y={30} className="case-study__copy">
                <span className="index-number">{project.index}</span>
                <h3 className="h-2 case-study__name">{project.name}</h3>
                <span className="tag tag--accent">{project.type}</span>
                <p className="text-body">{project.description}</p>
                <div className="btn-group">
                  {project.technology.map((tech) => (
                    <span className="tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollScale from={0.86} to={1} className="case-study__visual">
                <CaseStudyVisual project={project} />
              </ScrollScale>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
