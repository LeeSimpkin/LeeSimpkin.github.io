/*
  Add, remove or reorder projects here. The page rebuilds itself from this list.

  Each project can have:
    title    - project name
    kind     - e.g. "Dissertation", "University module", "Personal project"
    status   - optional, e.g. "In progress"
    summary  - one or two sentences, shown by default
    details  - optional longer text, shown when the visitor opens "More detail"
    tags     - technologies used
    links    - optional list of { label, href }

  Example of a link (add inside the links array of a project):
    { label: "Source on GitHub", href: "https://github.com/your-username/your-repo" }
*/
const PROJECTS = [
  {
    title: "LLM-driven NPC dialogue in Unity",
    kind: "Dissertation",
    summary:
      "A Unity tool that connects game characters to a locally hosted language model, so NPCs can hold dynamic conversations instead of following fixed dialogue trees.",
    details:
      "The model runs locally through Llama.cpp, so there are no cloud calls. Across 40 trials the mean response latency was about 2.03 seconds.",
    tags: ["Unity", "C#", "Llama.cpp", "Language models"],
    links: []
  },
  {
    title: "Particle shower simulation",
    kind: "University module",
    summary:
      "The same particle shower simulation built twice: on the GPU with CUDA and on the CPU in Rust.",
    details:
      "The GPU version uses CUDA 12.9 with OpenGL and ImGui for rendering and controls. The CPU version is written in Rust.",
    tags: ["CUDA", "Rust", "OpenGL", "ImGui"],
    links: []
  },
  {
    title: "Finite state machine character in MonoGame",
    kind: "Game project",
    summary:
      "A MonoGame project featuring an AI character whose behaviour is driven by a finite state machine.",
    details:
      "Includes sprite-sheet walking animation with horizontal flipping, and state transitions for the character's ball-dropping behaviour.",
    tags: ["MonoGame", "C#", "Finite state machines", "Animation"],
    links: []
  },
  {
    title: "Game Engine and Game Project",
    kind: "University Project",
    summary:
      "A 3D game running on a bespoke game engine written with OpenGL.",
    details:
      "A game involving AI Agents, a client-server to store highscores, projectile bullets, and more. Written on a bespoke phyics engine.",
    tags: ["OpenGL", "Client-Server", "C#", "3D Engine"],
    links: []
  },
   {
    title: "Beluga Bus",
    kind: "GameJam",
    summary:
      "A 2D game written for 3 thing game.",
    details:
      "You are a beluga whale that needs to pick up and drop off fish from their bus stop. Be quick, you are graded and the levels get harder!",
    tags: ["Unity", "Game Jam", "C#", "Lead Gameplay Programmer"],
    links: [{label: "Play on Itch", href: "https://loreislying.itch.io/belugabus"}]
  }
];
