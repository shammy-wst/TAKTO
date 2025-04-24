/**
 * Todo.js
 * A progressive enhancement component for TAKTO task manager
 * This provides the JavaScript-free fallback functionality
 */

// This component is not actually used in the current implementation
// It's included as a reference for a future progressive enhancement approach
// where the app would work without JavaScript and enhance with JS when available

class TodoComponent {
  constructor() {
    this.projectsContainer = document.createElement("div");
    this.projectsContainer.className = "projects-container no-js";

    this.tasksContainer = document.createElement("div");
    this.tasksContainer.className = "tasks-container no-js";
  }

  // Create a fallback project form that would work without JS
  createProjectForm() {
    return `
            <form action="index.html" method="get" class="no-js-form">
                <fieldset>
                    <legend>Créer un nouveau projet</legend>
                    <div class="form-group">
                        <label for="project-name-nojs">Nom du projet:</label>
                        <input type="text" id="project-name-nojs" name="project_name" required class="keyboard-focus">
                    </div>
                    <div class="form-group">
                        <label for="project-description-nojs">Description:</label>
                        <textarea id="project-description-nojs" name="project_description" class="keyboard-focus"></textarea>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="keyboard-focus">Enregistrer</button>
                    </div>
                </fieldset>
            </form>
        `;
  }

  // Create a fallback task form that would work without JS
  createTaskForm(projectId) {
    return `
            <form action="index.html" method="get" class="no-js-form">
                <input type="hidden" name="project_id" value="${projectId}">
                <fieldset>
                    <legend>Créer une nouvelle tâche</legend>
                    <div class="form-group">
                        <label for="task-name-nojs">Nom de la tâche:</label>
                        <input type="text" id="task-name-nojs" name="task_name" required class="keyboard-focus">
                    </div>
                    <div class="form-group">
                        <label for="task-description-nojs">Description:</label>
                        <textarea id="task-description-nojs" name="task_description" class="keyboard-focus"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="task-status-nojs">Statut:</label>
                        <select id="task-status-nojs" name="task_status" class="keyboard-focus">
                            <option value="todo">À faire</option>
                            <option value="in-progress">En cours</option>
                            <option value="done">Terminé</option>
                        </select>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="keyboard-focus">Enregistrer</button>
                    </div>
                </fieldset>
            </form>
        `;
  }

  // This would render a static HTML version of projects if JS is disabled
  renderNoJSProjects(projects) {
    let html = '<div class="no-js-projects">';

    if (projects.length === 0) {
      html +=
        "<p>Aucun projet. Utilisez le formulaire ci-dessous pour créer votre premier projet.</p>";
    } else {
      projects.forEach((project) => {
        html += `
                    <div class="project-card">
                        <h3>${project.name}</h3>
                        <div class="description">${
                          project.description || "Aucune description"
                        }</div>
                        <div class="card-actions">
                            <a href="index.html?view_project=${
                              project.id
                            }" class="action-btn view-btn">Voir</a>
                        </div>
                    </div>
                `;
      });
    }

    html += this.createProjectForm();
    html += "</div>";

    return html;
  }

  // This would render a static HTML version of tasks if JS is disabled
  renderNoJSTasks(project) {
    if (!project) return "";

    let html = `
            <div class="no-js-tasks">
                <h2>Tâches: ${project.name}</h2>
                <a href="index.html" class="back-link">← Retour aux projets</a>
        `;

    if (project.tasks.length === 0) {
      html +=
        "<p>Aucune tâche. Utilisez le formulaire ci-dessous pour créer votre première tâche.</p>";
    } else {
      // Group tasks by status for the no-JS view
      const todoTasks = project.tasks.filter((task) => task.status === "todo");
      const inProgressTasks = project.tasks.filter(
        (task) => task.status === "in-progress"
      );
      const doneTasks = project.tasks.filter((task) => task.status === "done");

      html += '<div class="tasks-by-status">';

      // To-do tasks
      html += '<div class="status-group">';
      html += "<h3>À faire</h3>";
      if (todoTasks.length === 0) {
        html += "<p>Aucune tâche à faire</p>";
      } else {
        todoTasks.forEach((task) => {
          html += `
                        <div class="task-card">
                            <h4>${task.name}</h4>
                            <div class="description">${
                              task.description || "Aucune description"
                            }</div>
                        </div>
                    `;
        });
      }
      html += "</div>";

      // In progress tasks
      html += '<div class="status-group">';
      html += "<h3>En cours</h3>";
      if (inProgressTasks.length === 0) {
        html += "<p>Aucune tâche en cours</p>";
      } else {
        inProgressTasks.forEach((task) => {
          html += `
                        <div class="task-card">
                            <h4>${task.name}</h4>
                            <div class="description">${
                              task.description || "Aucune description"
                            }</div>
                        </div>
                    `;
        });
      }
      html += "</div>";

      // Done tasks
      html += '<div class="status-group">';
      html += "<h3>Terminé</h3>";
      if (doneTasks.length === 0) {
        html += "<p>Aucune tâche terminée</p>";
      } else {
        doneTasks.forEach((task) => {
          html += `
                        <div class="task-card">
                            <h4>${task.name}</h4>
                            <div class="description">${
                              task.description || "Aucune description"
                            }</div>
                        </div>
                    `;
        });
      }
      html += "</div>";

      html += "</div>"; // End tasks-by-status
    }

    html += this.createTaskForm(project.id);
    html += "</div>";

    return html;
  }
}

// This would be used in a server-side rendered approach or with URL parameters for a no-JS experience
// export default TodoComponent;
