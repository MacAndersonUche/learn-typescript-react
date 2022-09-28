import { Link } from "react-router-dom";
import { Project } from "./Project";

interface ProjectCardProps {
    project: Project;
    onEdit: (project: Project) => void;
}

function cutString(str: string, max: number) {
  if (str.length > max) {
    return str.substring(0, max) + '...';
  }
  return str;
}

export default function ProjectCard({ project, onEdit }: ProjectCardProps) {
    const handleProjectClick = (projecToEdit: Project) => {
        onEdit(projecToEdit);
        
    }

    return (
        <div className="card">
        <img src={project.imageUrl} alt={project.name} />
        <section className="section dark">
            <Link to={'/projects/'+project.id}>
            <h5 className="strong">
            <strong>{project.name}</strong>
            </h5>
            <p>{cutString(project.description, 60)}</p>
            <p>Budget : {project.budget.toLocaleString()}</p>
            </Link>
            <button className="bordered" onClick={() => handleProjectClick(project)}>
                <span className="icon-edit"></span>
                Edit
            </button>
        </section>
        </div>
    );
    }