/**
 * TAKTO - Simple Task Manager
 * A lightweight task manager app for web developers
 */

// Define types for better TypeScript support
/**
 * @typedef {Object} Project
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {Task[]} tasks
 */

/**
 * @typedef {Object} Task
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} status
 */

// DOM Elements
const projectsList = document.getElementById("projects-list");
const tasksList = document.getElementById("tasks-list");
const projectsSection = document.getElementById("projects");
const tasksSection = document.getElementById("tasks");
const currentProjectName = document.getElementById("current-project-name");
const statusFilter = document.getElementById("status-filter");

// Buttons
const newProjectBtn = document.getElementById("new-project-btn");
const newTaskBtn = document.getElementById("new-task-btn");
const backToProjectsBtn = document.getElementById("back-to-projects-btn");
const cancelProjectBtn = document.getElementById("cancel-project-btn");
const cancelTaskBtn = document.getElementById("cancel-task-btn");

// Forms
const projectForm = document.getElementById("project-form");
const taskForm = document.getElementById("task-form");

// Modals
const projectModal = document.getElementById("project-modal");
const taskModal = document.getElementById("task-modal");

// Data
/** @type {Project[]} */
let projects = [];
let currentProjectId = null;

// Load data from localStorage
function loadData() {
  const storedProjects = localStorage.getItem("takto_projects");
  if (storedProjects) {
    projects = JSON.parse(storedProjects);
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem("takto_projects", JSON.stringify(projects));
}

// Generate unique ID
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Render projects
function renderProjects() {
  if (!projectsList) return;

  projectsList.innerHTML = "";

  if (projects.length === 0) {
    projectsList.innerHTML =
      '<div class="empty-state">Aucun projet pour le moment. Créez votre premier projet !</div>';
    return;
  }

  projects.forEach((project) => {
    const projectCard = document.createElement("div");
    projectCard.className = "project-card keyboard-focus";
    projectCard.tabIndex = 0;
    projectCard.setAttribute("data-id", project.id);

    // Count tasks by status
    const todoCount = project.tasks.filter(
      (task) => task.status === "todo"
    ).length;
    const inProgressCount = project.tasks.filter(
      (task) => task.status === "in-progress"
    ).length;
    const doneCount = project.tasks.filter(
      (task) => task.status === "done"
    ).length;

    projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <div class="description">${
              project.description || "Aucune description"
            }</div>
            <div class="project-stats">
                <span class="status status-todo">${todoCount} à faire</span>
                <span class="status status-in-progress">${inProgressCount} en cours</span>
                <span class="status status-done">${doneCount} terminées</span>
            </div>
            <div class="card-actions">
                <button class="action-btn view-btn">Voir</button>
                <button class="action-btn edit-btn">Éditer</button>
                <button class="action-btn delete-btn">Supprimer</button>
            </div>
        `;

    projectsList.appendChild(projectCard);

    // Add event listeners
    const viewBtn = projectCard.querySelector(".view-btn");
    const editBtn = projectCard.querySelector(".edit-btn");
    const deleteBtn = projectCard.querySelector(".delete-btn");

    if (viewBtn) {
      viewBtn.addEventListener("click", () => viewProject(project.id));
    }

    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openProjectModal(project);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (
          confirm(
            `Êtes-vous sûr de vouloir supprimer le projet "${project.name}" ?`
          )
        ) {
          deleteProject(project.id);
        }
      });
    }

    // Open project on click or Enter key
    projectCard.addEventListener("click", () => viewProject(project.id));
    projectCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        viewProject(project.id);
      }
    });
  });
}

// Render tasks for the current project
function renderTasks(filteredStatus = "all") {
  if (!tasksList) return;

  tasksList.innerHTML = "";

  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );
  if (!currentProject) return;

  let filteredTasks = currentProject.tasks;

  // Apply filter
  if (filteredStatus !== "all") {
    filteredTasks = filteredTasks.filter(
      (task) => task.status === filteredStatus
    );
  }

  if (filteredTasks.length === 0) {
    tasksList.innerHTML =
      '<div class="empty-state">Aucune tâche dans cette catégorie. Ajoutez-en une nouvelle !</div>';
    return;
  }

  filteredTasks.forEach((task) => {
    const taskCard = document.createElement("div");
    taskCard.className = "task-card keyboard-focus";
    taskCard.tabIndex = 0;
    taskCard.setAttribute("data-id", task.id);

    taskCard.innerHTML = `
            <h3>${task.name}</h3>
            <div class="description">${
              task.description || "Aucune description"
            }</div>
            <span class="status status-${task.status}">${getStatusLabel(
      task.status
    )}</span>
            <div class="card-actions">
                <button class="action-btn edit-btn">Éditer</button>
                <button class="action-btn delete-btn">Supprimer</button>
            </div>
        `;

    tasksList.appendChild(taskCard);

    // Add event listeners
    const editBtn = taskCard.querySelector(".edit-btn");
    const deleteBtn = taskCard.querySelector(".delete-btn");

    if (editBtn) {
      editBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openTaskModal(task);
      });
    }

    if (deleteBtn) {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (
          confirm(
            `Êtes-vous sûr de vouloir supprimer la tâche "${task.name}" ?`
          )
        ) {
          deleteTask(task.id);
        }
      });
    }

    // Open task edit modal on click or Enter key
    taskCard.addEventListener("click", () => openTaskModal(task));
    taskCard.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        openTaskModal(task);
      }
    });
  });
}

// View project
function viewProject(projectId) {
  currentProjectId = projectId;
  const project = projects.find((p) => p.id === projectId);

  if (
    project &&
    projectsSection &&
    tasksSection &&
    currentProjectName &&
    statusFilter
  ) {
    currentProjectName.textContent = project.name;
    projectsSection.classList.add("hidden");
    tasksSection.classList.remove("hidden");

    // Corrigé: Ajouter type assertion pour statusFilter
    if (statusFilter instanceof HTMLSelectElement) {
      statusFilter.value = "all";
    }

    renderTasks();
  }
}

// Add new project
function addProject(projectData) {
  const newProject = {
    id: generateId(),
    name: projectData.name,
    description: projectData.description,
    tasks: [],
  };

  projects.push(newProject);
  saveData();
  renderProjects();
}

// Update project
function updateProject(projectId, projectData) {
  const project = projects.find((p) => p.id === projectId);

  if (project) {
    project.name = projectData.name;
    project.description = projectData.description;

    saveData();
    renderProjects();

    // Update current project name if viewing this project
    if (currentProjectId === projectId && currentProjectName) {
      currentProjectName.textContent = project.name;
    }
  }
}

// Delete project
function deleteProject(projectId) {
  projects = projects.filter((project) => project.id !== projectId);
  saveData();
  renderProjects();

  // If deleted the current project, go back to projects view
  if (currentProjectId === projectId) {
    backToProjects();
  }
}

// Add new task
function addTask(taskData) {
  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );

  if (currentProject) {
    const newTask = {
      id: generateId(),
      name: taskData.name,
      description: taskData.description,
      status: taskData.status,
    };

    currentProject.tasks.push(newTask);
    saveData();

    // Corrigé: Vérifier le type pour statusFilter
    let filterValue = "all";
    if (statusFilter instanceof HTMLSelectElement) {
      filterValue = statusFilter.value;
    }
    renderTasks(filterValue);
  }
}

// Update task
function updateTask(taskId, taskData) {
  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );

  if (currentProject) {
    const task = currentProject.tasks.find((t) => t.id === taskId);

    if (task) {
      task.name = taskData.name;
      task.description = taskData.description;
      task.status = taskData.status;

      saveData();

      // Corrigé: Vérifier le type pour statusFilter
      let filterValue = "all";
      if (statusFilter instanceof HTMLSelectElement) {
        filterValue = statusFilter.value;
      }
      renderTasks(filterValue);
    }
  }
}

// Delete task
function deleteTask(taskId) {
  const currentProject = projects.find(
    (project) => project.id === currentProjectId
  );

  if (currentProject) {
    currentProject.tasks = currentProject.tasks.filter(
      (task) => task.id !== taskId
    );
    saveData();

    // Corrigé: Vérifier le type pour statusFilter
    let filterValue = "all";
    if (statusFilter instanceof HTMLSelectElement) {
      filterValue = statusFilter.value;
    }
    renderTasks(filterValue);
  }
}

// Helper function to get status label
function getStatusLabel(status) {
  switch (status) {
    case "todo":
      return "À faire";
    case "in-progress":
      return "En cours";
    case "done":
      return "Terminé";
    default:
      return status;
  }
}

/**
 * Open project modal
 * @param {Project|null} project - The project to edit, or null for a new project
 */
function openProjectModal(project = null) {
  if (!projectForm || !projectModal) return;

  const projectNameInput = document.getElementById("project-name");
  const projectDescInput = document.getElementById("project-description");

  if (!projectNameInput || !projectDescInput) return;

  // Clear previous values
  if (projectForm instanceof HTMLFormElement) {
    projectForm.reset();

    // If editing an existing project
    if (project) {
      // Corrigé: project est maintenant typé
      projectForm.setAttribute("data-id", project.id);
      if (projectNameInput instanceof HTMLInputElement) {
        projectNameInput.value = project.name;
      }
      if (projectDescInput instanceof HTMLTextAreaElement) {
        projectDescInput.value = project.description || "";
      }
    } else {
      projectForm.removeAttribute("data-id");
    }
  }

  projectModal.classList.remove("hidden");
  if (projectNameInput instanceof HTMLInputElement) {
    projectNameInput.focus();
  }
}

/**
 * Open task modal
 * @param {Task|null} task - The task to edit, or null for a new task
 */
function openTaskModal(task = null) {
  if (!taskForm || !taskModal) return;

  const taskNameInput = document.getElementById("task-name");
  const taskDescInput = document.getElementById("task-description");
  const taskStatusInput = document.getElementById("task-status");

  if (!taskNameInput || !taskDescInput || !taskStatusInput) return;

  // Clear previous values
  if (taskForm instanceof HTMLFormElement) {
    taskForm.reset();

    // If editing an existing task
    if (task) {
      // Corrigé: task est maintenant typé
      taskForm.setAttribute("data-id", task.id);
      if (taskNameInput instanceof HTMLInputElement) {
        taskNameInput.value = task.name;
      }
      if (taskDescInput instanceof HTMLTextAreaElement) {
        taskDescInput.value = task.description || "";
      }
      if (taskStatusInput instanceof HTMLSelectElement) {
        taskStatusInput.value = task.status;
      }
    } else {
      taskForm.removeAttribute("data-id");
      if (taskStatusInput instanceof HTMLSelectElement) {
        taskStatusInput.value = "todo"; // Default value for new tasks
      }
    }
  }

  taskModal.classList.remove("hidden");
  if (taskNameInput instanceof HTMLInputElement) {
    taskNameInput.focus();
  }
}

// Back to projects
function backToProjects() {
  if (!projectsSection || !tasksSection) return;

  projectsSection.classList.remove("hidden");
  tasksSection.classList.add("hidden");
  currentProjectId = null;
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Load initial data
  loadData();

  // Initialize the terminal with access to the task management functions
  // @ts-ignore
  if (window.TaktoTerminal) {
    // @ts-ignore
    const terminal = new TaktoTerminal();

    // Create a data manager API that the terminal can use
    const dataManager = {
      getAllProjects: () => projects,
      getProjectById: (id) => projects.find((p) => String(p.id) === String(id)),
      getAllTasks: () => {
        const allTasks = [];
        projects.forEach((project) => {
          project.tasks.forEach((task) => {
            allTasks.push({
              ...task,
              projectId: project.id,
            });
          });
        });
        return allTasks;
      },
      getTaskById: (id) => {
        for (const project of projects) {
          const task = project.tasks.find((t) => String(t.id) === String(id));
          if (task) {
            return { ...task, projectId: project.id };
          }
        }
        return null;
      },
      getTasksByProjectId: (projectId) => {
        const project = projects.find(
          (p) => String(p.id) === String(projectId)
        );
        return project
          ? project.tasks.map((task) => ({ ...task, projectId: project.id }))
          : [];
      },
      createProject: (name) => {
        const project = {
          id: generateId(),
          name,
          description: "",
          tasks: [],
        };
        projects.push(project);
        saveData();
        return project;
      },
      createTask: (projectId, name) => {
        const project = projects.find(
          (p) => String(p.id) === String(projectId)
        );
        if (!project) return null;

        const task = {
          id: generateId(),
          name,
          description: "",
          status: "todo",
        };

        project.tasks.push(task);
        saveData();
        return { ...task, projectId };
      },
      updateProject: (id, data) => {
        const project = projects.find((p) => String(p.id) === String(id));
        if (!project) return false;

        Object.assign(project, data);
        saveData();
        return true;
      },
      updateTask: (id, data) => {
        for (const project of projects) {
          const taskIndex = project.tasks.findIndex(
            (t) => String(t.id) === String(id)
          );
          if (taskIndex !== -1) {
            Object.assign(project.tasks[taskIndex], data);
            saveData();
            return true;
          }
        }
        return false;
      },
      deleteProject: (id) => {
        const initialLength = projects.length;
        projects = projects.filter((p) => String(p.id) !== String(id));

        if (projects.length !== initialLength) {
          saveData();
          return true;
        }
        return false;
      },
      deleteTask: (id) => {
        for (const project of projects) {
          const initialLength = project.tasks.length;
          project.tasks = project.tasks.filter(
            (t) => String(t.id) !== String(id)
          );

          if (project.tasks.length !== initialLength) {
            saveData();
            return true;
          }
        }
        return false;
      },
    };

    // Initialize the terminal with the data manager
    terminal.init(dataManager);
  }
});
