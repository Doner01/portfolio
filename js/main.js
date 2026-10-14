// ============================================================================
// MAIN INTERACTIVE LOGIC (Projects Grid, 3D Blender Viewport, C++ Terminal)
// ============================================================================

let currentFilter = "all";

function renderProjects(filter = "all") {
  currentFilter = filter;
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  const filtered = MY_PROJECTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  filtered.forEach((proj, idx) => {
    const isCpp = proj.category === "cpp";
    const badgeClass = isCpp
      ? "bg-cyan-500/15 text-cyan-300 border-cyan-500/40"
      : "bg-orange-500/15 text-orange-300 border-orange-500/40";

    const card = document.createElement("div");
    card.className =
      "rounded-2xl border border-slate-800 bg-[#0d1322] overflow-hidden flex flex-col justify-between hover:border-cyan-500/50 transition duration-300 shadow-lg group";

    card.innerHTML = `
      <div>
        <div class="h-48 bg-slate-900 relative overflow-hidden border-b border-slate-800">
          <img src="${proj.image}" alt="${proj.title}"
               onerror="this.style.display='none'"
               class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-mono border backdrop-blur-md ${badgeClass}">
            ${isCpp ? "C++ Code" : "3D Blender"}
          </span>
        </div>

        <div class="p-5">
          <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition mb-2">${proj.title}</h3>
          <p class="text-slate-400 text-sm leading-relaxed mb-4">${proj.description}</p>
          <div class="flex flex-wrap gap-1.5">
            ${proj.tags
              .map(
                (t) =>
                  `<span class="px-2.5 py-0.5 text-[11px] font-mono rounded-md bg-slate-900/90 text-slate-300 border border-slate-800">${t}</span>`
              )
              .join("")}
          </div>
        </div>
      </div>

      <div class="px-5 py-3.5 bg-slate-900/75 border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div class="flex items-center gap-3">
          ${
            proj.githubLink
              ? `<a href="${proj.githubLink}" target="_blank" rel="noopener" class="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1">GitHub / Link ↗</a>`
              : ""
          }
          ${
            proj.downloadFile
              ? `<a href="${proj.downloadFile}" download class="text-orange-400 hover:text-orange-300 hover:underline flex items-center gap-1">Download File ↓</a>`
              : ""
          }
        </div>
        <button onclick="openModal(${MY_PROJECTS.indexOf(proj)})"
                class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-semibold transition">
          Inspect Code
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterProjects(category, btnElement) {
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active-filter"));
  if (btnElement) btnElement.classList.add("active-filter");
  renderProjects(category);
}

// ============================================================================
// CODE & 3D ASSET INSPECTOR MODAL
// ============================================================================
function openModal(index) {
  const proj = MY_PROJECTS[index];
  if (!proj) return;
  document.getElementById("modal-title").textContent = proj.title;
  document.getElementById("modal-code").textContent =
    proj.codeSnippet || "// No code snippet provided.";
  document.getElementById("code-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("code-modal").classList.add("hidden");
}

// ============================================================================
// INTERACTIVE C++ DEVELOPER TERMINAL
// ============================================================================
function runCommand(cmd) {
  const termOutput = document.getElementById("terminal-output");
  const clean = cmd.trim().toLowerCase();

  if (clean === "clear") {
    termOutput.innerHTML = "";
    return;
  }

  let response = "";
  if (clean === "whoami") {
    response =
      "Ulug'bekov Shohjahon | Software Engineering Student @ Al-Khwarizmi University (AKHU) | C++ & 3D Blender Developer.";
  } else if (clean === "akhu") {
    response =
      "University: Al-Khwarizmi University (AKHU) | Department: Software Engineering | Focus: Algorithms, C++ OOP, Computer Graphics & 3D Modeling.";
  } else if (clean === "skills") {
    response =
      "[C++]: OOP, STL, Pointers, File I/O, Data Structures  |  [Blender 3D]: Hard-Surface Modeling, UV Unwrapping, PBR Shaders, Cycles/Eevee.";
  } else if (clean === "projects") {
    response =
      "Found " +
      MY_PROJECTS.length +
      " projects in js/projects-data.js:\n" +
      MY_PROJECTS.map((p, i) => `  [${i + 1}] ${p.title} (${p.category.toUpperCase()})`).join("\n");
  } else if (clean === "help") {
    response = "Available commands: whoami, akhu, skills, projects, clear";
  } else {
    response = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
  }

  const block = document.createElement("div");
  block.className = "space-y-1";
  block.innerHTML = `
    <div><span class="text-cyan-400">shohjahon@akhu:~$</span> <span class="text-white">${cmd}</span></div>
    <pre class="text-slate-300 whitespace-pre-wrap pl-3 border-l-2 border-slate-700">${response}</pre>
  `;
  termOutput.appendChild(block);
  termOutput.scrollTop = termOutput.scrollHeight;
}

// ============================================================================
// THREE.JS INTERACTIVE 3D BLENDER VIEWPORT
// ============================================================================
let scene, camera, renderer, currentMesh, meshMaterial;
let isDragging = false;
let prevMouse = { x: 0, y: 0 };

function createGeometry(type) {
  switch (type) {
    case "torus":
      return new THREE.TorusKnotGeometry(0.85, 0.26, 128, 20);
    case "crystal":
      return new THREE.OctahedronGeometry(1.15, 1);
    case "sphere":
      return new THREE.IcosahedronGeometry(1.1, 2);
    default:
      return new THREE.TorusKnotGeometry(0.85, 0.26, 128, 20);
  }
}

function updateStats(geometry) {
  const pos = geometry.attributes.position;
  const verts = pos ? pos.count : 0;
  const tris = geometry.index ? geometry.index.count / 3 : Math.floor(verts / 3);
  const el = document.getElementById("viewport-stats");
  if (el) {
    el.textContent = `Verts: ${verts.toLocaleString()} | Tris: ${tris.toLocaleString()}`;
  }
}

function setMeshType(type) {
  if (!scene || !currentMesh) return;
  const newGeo = createGeometry(type);
  currentMesh.geometry.dispose();
  currentMesh.geometry = newGeo;
  updateStats(newGeo);
}

function setMeshMode(mode, btn) {
  if (!meshMaterial) return;
  document.querySelectorAll(".mode-btn").forEach((b) => b.classList.remove("active-mode"));
  if (btn) btn.classList.add("active-mode");

  if (mode === "wireframe") {
    meshMaterial.wireframe = true;
    meshMaterial.color.setHex(0x22d3ee);
  } else {
    meshMaterial.wireframe = false;
    meshMaterial.color.setHex(0x06b6d4);
  }
}

function init3DViewport() {
  const container = document.getElementById("viewport-3d");
  if (!container || typeof THREE === "undefined") return;

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 1.3, 4.3);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const grid = new THREE.GridHelper(10, 20, 0x06b6d4, 0x1e293b);
  grid.position.y = -1.25;
  scene.add(grid);

  const geo = createGeometry("torus");
  meshMaterial = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    roughness: 0.25,
    metalness: 0.75,
    wireframe: false
  });
  currentMesh = new THREE.Mesh(geo, meshMaterial);
  scene.add(currentMesh);
  updateStats(geo);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
  keyLight.position.set(4, 6, 5);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0xf97316, 2.4, 12);
  rimLight.position.set(-3, -1.5, 2.5);
  scene.add(rimLight);

  const ambient = new THREE.AmbientLight(0x334155, 0.9);
  scene.add(ambient);

  // Mouse Drag Orbit
  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    prevMouse = { x: e.clientX, y: e.clientY };
  });
  window.addEventListener("mouseup", () => (isDragging = false));
  window.addEventListener("mousemove", (e) => {
    if (!isDragging || !currentMesh) return;
    const dx = e.clientX - prevMouse.x;
    const dy = e.clientY - prevMouse.y;
    currentMesh.rotation.y += dx * 0.01;
    currentMesh.rotation.x += dy * 0.01;
    prevMouse = { x: e.clientX, y: e.clientY };
  });

  window.addEventListener("resize", () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    if (!isDragging && currentMesh) {
      currentMesh.rotation.y += 0.008;
      currentMesh.rotation.x += 0.003;
    }
    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener("DOMContentLoaded", () => {
  renderProjects("all");
  init3DViewport();

  const termInput = document.getElementById("terminal-input");
  if (termInput) {
    termInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && termInput.value.trim()) {
        runCommand(termInput.value);
        termInput.value = "";
      }
    });
  }

  if (window.lucide) {
    lucide.createIcons();
  }
});
