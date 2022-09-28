import { useEffect, useState } from "react";
import { Project } from "./Project";
import { projectAPI } from "./projectAPI";
import ProjectList from "./ProjectList";


export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);

  const saveProject = (project: Project) => {
    projectAPI.put(project).then((savedProject) => {
      const newProjects = projects.map((p) =>
        p.id === savedProject.id ? savedProject : p
      );
      setProjects(newProjects);
    })

  }

  const handleMoreClick = () => {
    setCurrentPage(currentPage => currentPage + 1);
  }

  useEffect(() => {
    async function loadProjects() {
      setLoading(true);
      try {
        const data = await projectAPI.get(currentPage);
        if(currentPage === 1) {

        setProjects(data);
        } else {
          setProjects(projects => [...projects, ...data]);
        }
      }
      catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, [currentPage]);


  return (
    <div>
      <h1>Projects</h1>
      <ProjectList projects={projects} onSave={saveProject} />
     {!loading && !error && (
       <div className="row">
        <div className="col-sm-12">
          <div className="button-group fluid">
            <button className="button default" onClick={handleMoreClick}>
                 More...
              </button>
            </div>
          </div>
        </div>
   )}
      {error && (
        <div className="row">
          <div className="card large error">
            <section>
              <p>
                <span className="icon-alert inverse "></span>
                {error}
              </p>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}