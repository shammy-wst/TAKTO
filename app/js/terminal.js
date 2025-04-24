/**
 * TAKTO Terminal - A command-line interface for the Task Manager
 */

// @ts-ignore
class TaktoTerminal {
  constructor() {
    // Initialize properties
    this.isOpen = false;
    this.lineNumber = 1;
    this.isVisible = true;
    this.history = [];
    this.historyIndex = -1;
    this.commands = {};

    // Check if an instance already exists to prevent duplication
    const existingTerminal = document.querySelector(".takto-terminal");
    if (existingTerminal) {
      existingTerminal.remove();
    }

    // Create terminal elements
    this.container = document.createElement("div");
    this.container.className = "takto-terminal";
    this.container.setAttribute("role", "dialog");
    this.container.setAttribute("aria-label", "TAKTO Terminal");
    this.container.style.display = "block";

    // Create header
    this.header = document.createElement("div");
    this.header.className = "takto-terminal-header";

    // Create title
    this.title = document.createElement("div");
    this.title.className = "takto-terminal-title";
    this.title.textContent = "TAKTO Terminal";

    // Create buttons container
    this.buttonsContainer = document.createElement("div");
    this.buttonsContainer.className = "takto-terminal-buttons";

    // Create close button
    this.closeBtn = document.createElement("button");
    this.closeBtn.className = "takto-terminal-btn takto-terminal-close";
    this.closeBtn.innerHTML = "&times;";
    this.closeBtn.setAttribute("aria-label", "Close terminal");
    this.closeBtn.addEventListener("click", () => this.toggle());

    // Add buttons to container
    this.buttonsContainer.appendChild(this.closeBtn);

    // Add title and buttons to header
    this.header.appendChild(this.title);
    this.header.appendChild(this.buttonsContainer);

    // Create output area
    this.outputArea = document.createElement("div");
    this.outputArea.className = "takto-terminal-output";

    // Create input area
    this.inputArea = document.createElement("div");
    this.inputArea.className = "takto-terminal-input-area";

    // Create prompt
    this.prompt = document.createElement("span");
    this.prompt.className = "takto-terminal-prompt";
    this.prompt.textContent = "> ";

    // Create input field
    this.input = document.createElement("input");
    this.input.className = "takto-terminal-input";
    this.input.type = "text";
    this.input.setAttribute("spellcheck", "false");
    this.input.setAttribute("autocomplete", "off");
    this.input.setAttribute("aria-label", "Terminal command input");

    // Add event listener for keyboard input
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));

    // Add prompt and input to input area
    this.inputArea.appendChild(this.prompt);
    this.inputArea.appendChild(this.input);

    // Add header, output area, and input area to container
    this.container.appendChild(this.header);
    this.container.appendChild(this.outputArea);
    this.container.appendChild(this.inputArea);

    // Add terminal to document
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.appendChild(this.container);
    } else {
      document.body.appendChild(this.container);
    }

    // Create button to open terminal
    this.openBtn = document.createElement("button");
    this.openBtn.className = "takto-terminal-open-btn";
    this.openBtn.innerHTML = "&gt;_";
    this.openBtn.setAttribute("aria-label", "Open terminal");
    this.openBtn.addEventListener("click", () => this.toggle());

    // Check if open button already exists
    const existingOpenBtn = document.querySelector(".takto-terminal-open-btn");
    if (existingOpenBtn) {
      existingOpenBtn.remove();
    }

    // Add open button to document
    document.body.appendChild(this.openBtn);

    // Register built-in commands
    this.registerDefaultCommands();

    // Add terminal styles
    this.addTerminalStyles();

    // Register keyboard shortcuts
    this.registerKeyboardShortcuts();

    // Focus on input
    this.focus();
  }

  // Create open button (not used in full-screen mode but kept for compatibility)
  createOpenButton() {
    this.openBtn = document.createElement("button");
    this.openBtn.className = "open-terminal-btn";
    this.openBtn.textContent = "Open Terminal";
    this.openBtn.setAttribute("aria-label", "Open terminal");
    this.openBtn.addEventListener("click", () => this.show());
    document.body.appendChild(this.openBtn);
  }

  // Show welcome message
  showWelcomeMessage() {
    this.print("Welcome to TAKTO - Task Manager");
    this.print(
      "Type <strong>help</strong> for available commands or press <strong>Ctrl+H</strong>"
    );
    this.print("");
    this.print("Start by creating a project:");
    this.print('  create project "My Project"');
    this.print("");
    this.print("Then add tasks to it:");
    this.print('  create task 1 "My first task"');
    this.print("");
  }

  // Register default commands
  registerDefaultCommands() {
    this.registerCommand("help", {
      description: "Shows the list of available commands",
      usage: "help [command]",
      callback: (args) => {
        if (args.length > 0) {
          const cmdName = args[0];
          const cmd = this.commands[cmdName];

          if (cmd) {
            this.print(`<strong>${cmdName}</strong>: ${cmd.description}`);
            this.print(`Usage: ${cmd.usage || cmdName}`);
            if (cmd.examples) {
              this.print("Examples:");
              cmd.examples.forEach((example) => {
                this.print(`  ${example}`);
              });
            }
          } else {
            this.printError(`Command "${cmdName}" not found.`);
          }
        } else {
          this.print("Available commands:");

          Object.keys(this.commands)
            .sort()
            .forEach((cmd) => {
              this.print(
                `  <strong>${cmd}</strong>: ${this.commands[cmd].description}`
              );
            });

          this.print(
            "\nType <strong>help [command]</strong> for more information about a specific command."
          );
        }
      },
    });

    this.registerCommand("clear", {
      description: "Clears the terminal screen",
      callback: () => {
        this.clear();
      },
    });

    this.registerCommand("about", {
      description: "Shows information about TAKTO",
      callback: () => {
        this.print(
          '<span class="terminal-welcome">TAKTO - Task Management System</span>'
        );
        this.print("Version: 1.0.0");
        this.print(
          "A simple task management system with project organization."
        );
        this.print("Use the terminal to manage your projects and tasks.");
        this.print("Type <strong>help</strong> to see available commands.");
      },
    });

    this.registerCommand("accessibility", {
      description: "Shows accessibility options and keyboard shortcuts",
      callback: () => {
        this.print(
          '<span class="terminal-welcome">Accessibility Options</span>'
        );
        this.print("TAKTO is designed to be fully accessible via keyboard.");
        this.print("\nKeyboard shortcuts:");
        this.print("  <strong>Ctrl+H</strong>: Show help");
        this.print("  <strong>Ctrl+L</strong>: List projects");
        this.print("  <strong>Ctrl+T</strong>: List tasks");
        this.print("  <strong>Ctrl+C</strong>: Clear terminal");
        this.print("  <strong>Ctrl+A</strong>: Show about information");
        this.print("  <strong>Tab</strong>: Auto-complete command");
        this.print("  <strong>↑/↓</strong>: Navigate command history");

        this.print("\nNavigation shortcuts:");
        this.print("  <strong>Alt+T</strong>: Switch to Terminal");
        this.print("  <strong>Alt+R</strong>: Switch to README");
        this.print("  <strong>Alt+F</strong>: Switch to FAQ");
        this.print("  <strong>Alt+O</strong>: Switch to Our Team");
        this.print("  <strong>Alt+A</strong>: Switch to Accessibility page");

        this.print(
          "\nFor more options and visual adaptations, visit the <strong>Accessibility</strong> tab."
        );
      },
    });
  }

  // Register a new command
  registerCommand(name, options) {
    if (typeof options.callback !== "function") {
      throw new Error("Command callback must be a function");
    }

    this.commands[name] = {
      description: options.description || "No description",
      usage: options.usage || name,
      examples: options.examples || [],
      callback: options.callback,
    };
  }

  // Execute a command
  execute(command) {
    if (!command) return;

    // Add command to history
    this.history.push(command);
    this.historyIndex = this.history.length;

    // Parse command and arguments
    const args = command.split(" ");
    const cmd = args.shift().toLowerCase();

    // Check if command exists
    if (
      this.commands &&
      Object.prototype.hasOwnProperty.call(this.commands, cmd) &&
      this.commands[cmd] &&
      typeof this.commands[cmd].callback === "function"
    ) {
      try {
        this.commands[cmd].callback(args);
      } catch (e) {
        this.printError(`Error executing command '${cmd}': ${e.message}`);
      }
    } else {
      this.printError(`Command not found: ${cmd}`);
    }

    // Clear input
    if (this.input) {
      this.input.value = "";
    }
  }

  // Handle keyboard events
  handleKeyDown(event) {
    // Enter key: execute command
    if (event.key === "Enter") {
      const command = this.input.value.trim();
      if (command) {
        this.execute(command);
      }
    }
    // Up arrow: previous command in history
    else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (this.history.length > 0) {
        if (this.historyIndex > 0) {
          this.historyIndex--;
        } else if (this.historyIndex === -1) {
          this.historyIndex = this.history.length - 1;
        }
        this.input.value = this.history[this.historyIndex];
        // Move cursor to end
        setTimeout(() => {
          this.input.selectionStart = this.input.selectionEnd =
            this.input.value.length;
        }, 0);
      }
    }
    // Down arrow: next command in history
    else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else if (this.historyIndex === this.history.length - 1) {
        this.historyIndex = -1;
        this.input.value = "";
      }
    }
    // Tab key: command autocompletion
    else if (event.key === "Tab") {
      event.preventDefault();
      const partial = this.input.value.trim().split(/\s+/)[0].toLowerCase();

      if (partial) {
        const matches = Object.keys(this.commands).filter((cmd) =>
          cmd.startsWith(partial)
        );

        if (matches.length === 1) {
          // Complete the command if there's an exact match
          this.input.value = matches[0] + " ";
        } else if (matches.length > 1) {
          // Show possible completions
          this.printCommandEcho(this.input.value);
          this.print("<strong>Possible completions:</strong>");
          matches.forEach((match) => {
            this.print(`  ${match}`);
          });
        }
      }
    }
  }

  // Print a line to the terminal
  print(text) {
    this.printToTerminal(text);
  }

  // Print an error message
  printError(text) {
    this.printToTerminal(text, "error");
  }

  // Print a success message
  printSuccess(text) {
    this.printToTerminal(text, "success");
  }

  // Print the command echo
  printCommandEcho(text) {
    this.printToTerminal(`> ${text}`, "command-echo");
  }

  // Print to terminal with line number
  printToTerminal(text, className = "") {
    if (!this.outputArea) return;

    const line = document.createElement("div");
    line.className = `takto-terminal-line${className ? " " + className : ""}`;
    line.innerHTML = text;

    if (typeof this.lineNumber === "number") {
      line.setAttribute("data-line-number", String(this.lineNumber++));
    }

    this.outputArea.appendChild(line);
    this.scrollToBottom();

    // Announce to screen readers if it's an error or important message
    if (className === "error" || className === "success") {
      const srAnnounce = document.createElement("div");
      srAnnounce.className = "sr-only";
      srAnnounce.setAttribute("role", "alert");
      srAnnounce.textContent = text.replace(/<[^>]*>/g, ""); // Remove HTML tags
      this.outputArea.appendChild(srAnnounce);

      // Remove after announcement
      setTimeout(() => {
        if (srAnnounce.parentNode) {
          srAnnounce.parentNode.removeChild(srAnnounce);
        }
      }, 1000);
    }
  }

  // Clear terminal output
  clear() {
    this.outputArea.innerHTML = "";
    this.lineNumber = 1;
  }

  // Scroll to bottom of terminal
  scrollToBottom() {
    if (this.outputArea) {
      this.outputArea.scrollTop = this.outputArea.scrollHeight;
    }
  }

  // Focus on terminal input
  focus() {
    this.input.focus();
  }

  // Register keyboard shortcuts for common commands
  registerKeyboardShortcuts() {
    this.container.addEventListener("keydown", (e) => {
      // Only process if Ctrl key is pressed and not in input field
      if (e.ctrlKey && e.target !== this.input) {
        let commandToExecute = null;

        switch (e.key) {
          case "h": // Ctrl+H: Help
            commandToExecute = "help";
            break;
          case "l": // Ctrl+L: List projects
            commandToExecute = "ls projects";
            break;
          case "t": // Ctrl+T: List tasks
            commandToExecute = "ls tasks";
            break;
          case "c": // Ctrl+C: Clear
            commandToExecute = "clear";
            break;
          case "a": // Ctrl+A: About
            commandToExecute = "about";
            break;
        }

        if (commandToExecute) {
          e.preventDefault();
          this.input.value = commandToExecute;
          this.execute(commandToExecute);
          this.input.value = "";
        }
      }
    });

    // Add keyboard shortcut hint to help command output
    const originalHelp = this.commands.help.callback;
    this.commands.help.callback = (args) => {
      originalHelp(args);
      if (!args.length) {
        this.print("\nKeyboard shortcuts:");
        this.print("  <strong>Ctrl+H</strong>: Show help");
        this.print("  <strong>Ctrl+L</strong>: List projects");
        this.print("  <strong>Ctrl+T</strong>: List tasks");
        this.print("  <strong>Ctrl+C</strong>: Clear terminal");
        this.print("  <strong>Ctrl+A</strong>: Show about information");
        this.print("  <strong>Tab</strong>: Auto-complete command");
        this.print("  <strong>↑/↓</strong>: Navigate command history");
      }
    };
  }

  // Show terminal
  show() {
    this.container.classList.remove("hidden");
    this.isVisible = true;
    this.focus();
  }

  // Hide terminal
  hide() {
    this.container.classList.add("hidden");
    this.isVisible = false;
  }

  // Toggle terminal visibility
  toggle() {
    if (this.isVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  // Initialize terminal with data manager
  init(dataManager) {
    this.dataManager = dataManager;

    // Register data-related commands
    this.registerCommand("ls", {
      description: "List projects or tasks",
      usage: "ls [projects|tasks|tasks in <project_id>]",
      examples: ["ls projects", "ls tasks", "ls tasks in 1"],
      callback: (args) => {
        if (!args.length || args[0] === "projects") {
          const projects = this.dataManager.getAllProjects();
          if (projects.length === 0) {
            this.print(
              'No projects found. Create one with: create project "Project name"'
            );
            return;
          }

          this.print("Projects:");
          projects.forEach((project) => {
            this.print(
              `  [${project.id}] ${project.name} (${project.tasks.length} tasks)`
            );
          });
        } else if (args[0] === "tasks") {
          if (args[1] === "in" && args[2]) {
            const projectId = args[2];
            const tasks = this.dataManager.getTasksByProjectId(projectId);
            const project = this.dataManager.getProjectById(projectId);

            if (!project) {
              this.printError(`Project with ID ${projectId} not found.`);
              return;
            }

            if (tasks.length === 0) {
              this.print(
                `No tasks found in project "${project.name}". Create one with: create task ${projectId} "Task name"`
              );
              return;
            }

            this.print(`Tasks in project "${project.name}":`);
            tasks.forEach((task) => {
              const statusText = this.getStatusText(task.status);
              this.print(`  [${task.id}] ${task.name} - ${statusText}`);
            });
          } else {
            const tasks = this.dataManager.getAllTasks();
            if (tasks.length === 0) {
              this.print(
                "No tasks found. Create a project first, then add tasks to it."
              );
              return;
            }

            this.print("All tasks:");
            tasks.forEach((task) => {
              const project = this.dataManager.getProjectById(task.projectId);
              const statusText = this.getStatusText(task.status);
              this.print(
                `  [${task.id}] ${task.name} - ${statusText} (Project: ${project.name})`
              );
            });
          }
        } else {
          this.printError(`Unknown list type: ${args[0]}`);
        }
      },
    });

    this.registerCommand("create", {
      description: "Create a new project or task",
      usage: 'create [project|task] [project_id (for task)] "Name"',
      examples: [
        'create project "My new project"',
        'create task 1 "My new task"',
      ],
      callback: (args) => {
        if (!args.length) {
          this.printError("Please specify what to create: project or task");
          return;
        }

        const type = args[0];
        if (type === "project") {
          const name = this.extractQuotedText(args.slice(1).join(" "));
          if (!name) {
            this.printError(
              'Please provide a project name in quotes: create project "Project name"'
            );
            return;
          }

          const project = this.dataManager.createProject(name);
          if (project) {
            this.printSuccess(
              `Project "${name}" created with ID: ${project.id}`
            );
          } else {
            this.printError("Failed to create project");
          }
        } else if (type === "task") {
          if (args.length < 2) {
            this.printError(
              'Please provide a project ID: create task <project_id> "Task name"'
            );
            return;
          }

          const projectId = args[1];
          const name = this.extractQuotedText(args.slice(2).join(" "));

          if (!name) {
            this.printError(
              'Please provide a task name in quotes: create task <project_id> "Task name"'
            );
            return;
          }

          const project = this.dataManager.getProjectById(projectId);
          if (!project) {
            this.printError(`Project with ID ${projectId} not found.`);
            return;
          }

          const task = this.dataManager.createTask(projectId, name);
          if (task) {
            this.printSuccess(
              `Task "${name}" created with ID: ${task.id} in project "${project.name}"`
            );
          } else {
            this.printError("Failed to create task");
          }
        } else {
          this.printError(`Unknown creation type: ${type}`);
        }
      },
    });
  }

  // Helper function to extract text between quotes
  extractQuotedText(text) {
    const matches = text.match(/"([^"]*)"/);
    return matches ? matches[1] : null;
  }

  // Helper function to get status text with color
  getStatusText(status) {
    switch (status) {
      case "todo":
        return '<span class="status-todo">Todo</span>';
      case "in-progress":
        return '<span class="status-in-progress">In Progress</span>';
      case "done":
        return '<span class="status-done">Done</span>';
      default:
        return status;
    }
  }

  // Close terminal
  close() {
    this.hide();
  }

  // Create terminal buttons (only close button now)
  createTerminal() {
    // Terminal header
    this.header = document.createElement("div");
    this.header.className = "takto-terminal-header";
    this.header.setAttribute("role", "toolbar");
    this.header.setAttribute("aria-label", "Terminal controls");

    // Title
    this.title = document.createElement("div");
    this.title.className = "takto-terminal-title";
    this.title.textContent = "TAKTO Terminal";
    this.header.appendChild(this.title);

    // Controls container
    this.controls = document.createElement("div");
    this.controls.className = "takto-terminal-controls";

    // Close button
    this.closeBtn = document.createElement("button");
    this.closeBtn.className = "takto-terminal-btn takto-terminal-close";
    this.closeBtn.innerHTML = "&#10005;"; // X symbol
    this.closeBtn.setAttribute("aria-label", "Close terminal");
    this.closeBtn.addEventListener("click", () => this.close());
    this.controls.appendChild(this.closeBtn);

    this.header.appendChild(this.controls);

    // Insert header at the top of terminal container
    this.container.insertBefore(this.header, this.container.firstChild);
  }

  // Initialize additional event listeners
  initializeEventListeners() {
    // Make terminal draggable by the header
    this.header.addEventListener("mousedown", (e) => {
      if (e.target === this.header || e.target === this.title) {
        const startX = e.clientX;
        const startY = e.clientY;
        const startLeft = this.container.offsetLeft;
        const startTop = this.container.offsetTop;

        const moveHandler = (moveEvent) => {
          const deltaX = moveEvent.clientX - startX;
          const deltaY = moveEvent.clientY - startY;

          this.container.style.left = `${startLeft + deltaX}px`;
          this.container.style.top = `${startTop + deltaY}px`;
        };

        const upHandler = () => {
          document.removeEventListener("mousemove", moveHandler);
          document.removeEventListener("mouseup", upHandler);
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", upHandler);
      }
    });
  }

  /**
   * Add styles to make terminal pages fill the screen height without scrolling
   */
  addTerminalPageStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .takto-terminal-page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background-color: #1e1e1e;
        color: #f0f0f0;
        font-family: 'Courier New', monospace;
        padding: 1rem;
        box-sizing: border-box;
      }
      
      .takto-terminal-page-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }
      
      .takto-terminal-page-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
      
      .takto-terminal-page-content {
        flex: 1;
        overflow-y: auto;
        padding-right: 0.5rem;
      }
      
      .takto-terminal-page-footer {
        display: flex;
        justify-content: center;
        margin-top: 1rem;
      }
      
      .takto-terminal-page-button {
        background-color: #333;
        color: #f0f0f0;
        border: none;
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        cursor: pointer;
        border-radius: 3px;
      }
      
      .takto-terminal-page-button:hover {
        background-color: #444;
      }
    `;
    document.head.appendChild(style);
  }

  // Add terminal styles
  addTerminalStyles() {
    const styleId = "takto-terminal-styles";
    // Check if styles already exist
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `
        .takto-terminal {
          background-color: #1e1e1e;
          color: #f0f0f0;
          font-family: 'Courier New', monospace;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          height: calc(100vh - 40px);
          margin: 5px;
        }
        
        .takto-terminal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background-color: #333;
          padding: 5px 10px;
          border-bottom: 1px solid #444;
          user-select: none;
        }
        
        .takto-terminal-title {
          color: #ddd;
          font-weight: bold;
        }
        
        .takto-terminal-buttons {
          display: flex;
          gap: 5px;
        }
        
        .takto-terminal-btn {
          background: transparent;
          border: none;
          color: #ddd;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 16px;
          padding: 0;
        }
        
        .takto-terminal-close {
          background-color: rgba(255, 59, 48, 0.6);
        }
        
        .takto-terminal-close:hover {
          background-color: rgba(255, 59, 48, 0.8);
        }
        
        .takto-terminal-output {
          flex: 1;
          overflow-y: auto;
          padding: 10px;
          scrollbar-width: thin;
          scrollbar-color: #444 #1e1e1e;
        }
        
        .takto-terminal-output::-webkit-scrollbar {
          width: 8px;
        }
        
        .takto-terminal-output::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        
        .takto-terminal-output::-webkit-scrollbar-thumb {
          background-color: #444;
          border-radius: 20px;
          border: 2px solid #1e1e1e;
        }
        
        .takto-terminal-line {
          margin-bottom: 4px;
          position: relative;
          padding-left: 20px;
          line-height: 1.4;
        }
        
        .takto-terminal-line::before {
          content: attr(data-line-number);
          position: absolute;
          left: 0;
          color: #666;
          font-size: 0.8em;
          top: 2px;
        }
        
        .takto-terminal-input-area {
          display: flex;
          padding: 5px 10px;
          background-color: #252525;
          border-top: 1px solid #333;
        }
        
        .takto-terminal-prompt {
          color: #0f0;
          margin-right: 5px;
        }
        
        .takto-terminal-input {
          background: transparent;
          border: none;
          color: #fff;
          font-family: inherit;
          flex: 1;
          outline: none;
          font-size: inherit;
        }
        
        .takto-terminal-open-btn {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #333;
          color: #fff;
          border: none;
          border-radius: 4px;
          padding: 8px 12px;
          font-family: monospace;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        
        .takto-terminal-open-btn:hover {
          background-color: #444;
        }
        
        .error {
          color: #ff6b6b;
        }
        
        .success {
          color: #51cf66;
        }
        
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }
      `;
      document.head.appendChild(style);
    }

    // Also add the page styles
    this.addTerminalPageStyles();
  }
}

// Attach to window object for global access
// @ts-ignore
window.TaktoTerminal = TaktoTerminal;
