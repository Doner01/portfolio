# Ulug'bekov Shohjahon — C++ & 3D Blender Portfolio (AKHU)

## Folder Structure
- `index.html` — Main website file (double-click to open in any browser!)
- `css/style.css` — Custom dark theme styling
- `js/projects-data.js` — **EDIT THIS FILE** to add your own C++ and Blender projects, links, and files
- `js/main.js` — 3D Blender viewport, interactive C++ terminal, and project cards logic
- `assets/images/` — Put your `.png`, `.jpg`, or `.svg` Blender renders and C++ screenshots here
- `assets/files/` — Put your downloadable `.cpp`, `.blend`, `.obj`, or `.zip` files here

## How to Add a Project
1. Copy your image into `assets/images/my-project.png`
2. Copy your code or 3D file into `assets/files/my-project.zip`
3. Open `js/projects-data.js` in VS Code or Notepad and add an entry to `MY_PROJECTS`:
```javascript
  {
    title: "My New C++ / Blender Project",
    category: "cpp", // or "blender"
    description: "Short description of what you built.",
    image: "assets/images/my-project.png",
    tags: ["C++", "Blender", "AKHU"],
    githubLink: "https://github.com/your-username/your-repo",
    downloadFile: "assets/files/my-project.zip",
    codeSnippet: "// Optional code or 3D stats preview"
  }
```
