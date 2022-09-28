import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    project: Project;
    onCancel: () => void;
    onSave: (project: Project) => void;
}


export default function ProjectForm({ onCancel, onSave, project: initialProject }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({
        name: "",
        description: "",
        budget: "",
    });

    function validate(project: Project) {
        let errors = { name: "", description: "", budget: "" };
        if (project.name.length === 0) {
            errors.name = "Name is required";
        }
        if (project.description.length === 0) {
            errors.description = "Description is required";
        }
        if (project.budget < 0) {
            errors.budget = "Budget must be greater than 0";
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = "Name must be at least 3 characters";
        }

        return errors;
    }

    function isValid() {
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        )
    }

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(new Project(project));
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let newValue = type === "checkbox" ? checked : value;

        if (type === 'number') {
            newValue = Number(newValue);
        }

        const change = {
            [name]: newValue
        }

        let updatedProject: Project;
        setProject((prevProject) => {
            updatedProject = new Project({ ...prevProject, ...change })
            return updatedProject;
        });

        setErrors(() => validate(updatedProject));
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
            {
                errors.name.length > 0 && (
                    <div className="card error">
                        <p>{errors.name}</p>
                    </div>
                )
            }
            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description"
                value={project.description} onChange={handleChange}></textarea>
            {
                errors.description.length > 0 && (
                    <div className="card error">
                        <p>{errors.description}</p>
                    </div>
                )
            }
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget"
                value={project.budget} onChange={handleChange} />
            {
                errors.budget.length > 0 && (
                    <div className="card error">
                        <p>{errors.budget}</p>
                    </div>
                )
            }

            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" />

            <div className="input-group">
                <button className="primary bordered medium">Save</button>
                <span></span>
                <button type="button" className="bordered medium" onClick={onCancel}>cancel</button>
            </div>
        </form>
    )
}