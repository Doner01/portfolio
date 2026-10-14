// ============================================================================
// ULUG'BEKOV SHOHJAHON - PROJECTS DATABASE
// ============================================================================
// HOW TO ADD YOUR OWN PROJECT:
// 1. Put your screenshot or Blender render inside:  assets/images/
// 2. Put your .cpp, .blend, .obj, or .zip file in:  assets/files/
// 3. Copy one of the project blocks below, paste it at the bottom of the list,
//    and update the title, category ("cpp" or "blender"), image, githubLink,
//    and downloadFile!
// ============================================================================

const PROFILE_LINKS = {
  name: "Ulug'bekov Shohjahon",
  university: "Al-Khwarizmi University (AKHU)",
  major: "Software Engineering Student",
  github: "https://github.com/",
  telegram: "https://t.me/",
  email: "mailto:shohjahon@example.com"
};

const MY_PROJECTS = [
  {
    title: "AKHU Student Grading System (C++)",
    category: "cpp", // "cpp" or "blender"
    description: "Console-based student GPA & course registry software written in modern C++17 using OOP classes, STL vectors, sorting algorithms, and file persistence.",
    image: "assets/images/cpp-grading.svg",
    tags: ["C++17", "OOP", "STL Vector", "File I/O"],
    githubLink: "https://github.com/",
    downloadFile: "assets/files/StudentSystem.cpp",
    codeSnippet: `#include <iostream>
#include <vector>
using namespace std;

struct Student {
    int id;
    string name;
    double gpa;
};

int main() {
    Student s = {1001, "Ulug'bekov Shohjahon", 4.00};
    cout << "AKHU Student: " << s.name << " | GPA: " << s.gpa << endl;
    return 0;
}`
  },

  {
    title: "Cyber-Mech Drone 3D Asset",
    category: "blender",
    description: "Hard-surface sci-fi reconnaissance drone modeled in Blender 4.0. Features clean bevel topology, UV unwrapping, and procedural emission + metallic PBR shaders.",
    image: "assets/images/blender-drone.svg",
    tags: ["Blender 4.0", "Cycles Render", "Hard-Surface", "PBR"],
    githubLink: "https://sketchfab.com/",
    downloadFile: "assets/files/cyber_drone.obj",
    codeSnippet: `// Blender 3D Asset Metadata
Model Name   : Cyber_Mech_Drone_v2
Vertices     : 18,420
Triangles    : 34,110
Render Engine: Cycles (512 Samples + Denoiser)
Exported File: assets/files/cyber_drone.obj`
  },

  {
    title: "Wavefront .OBJ 3D Mesh Parser (C++)",
    category: "cpp",
    description: "Custom C++ parser that bridges my Blender 3D models and C++ code by reading exported .obj files and loading vertex coordinates and face indices into memory.",
    image: "assets/images/obj-parser.svg",
    tags: ["C++", "3D Graphics", "Blender .OBJ", "Memory"],
    githubLink: "https://github.com/",
    downloadFile: "assets/files/obj_parser.cpp",
    codeSnippet: `// Parsing 'v x y z' vertex lines exported from Blender
while (std::getline(file, line)) {
    if (line.rfind("v ", 0) == 0) {
        std::istringstream iss(line.substr(2));
        Vec3 v;
        iss >> v.x >> v.y >> v.z;
        vertices.push_back(v);
    }
}`
  },

  {
    title: "Sci-Fi Energy Katana (Game-Ready Prop)",
    category: "blender",
    description: "Low-poly game-ready melee weapon modeled in Blender with baked normal maps and neon cyan emissive blade channels for real-time game engines.",
    image: "assets/images/blender-katana.svg",
    tags: ["Blender", "Low-Poly", "UV Baking", "Game Asset"],
    githubLink: "https://artstation.com/",
    downloadFile: "assets/files/cyber_drone.obj",
    codeSnippet: `// Game Engine Asset Specs
Polycount  : 2,480 Tris (Game-Ready LOD0)
Textures   : 2048x2048 Albedo, Normal, Roughness, Emissive
Target     : Unreal Engine / Unity / Custom C++ OpenGL`
  },

  {
    title: "CPU Mini Raytracer in C++",
    category: "cpp",
    description: "From-scratch C++ raytracing renderer calculating ray-sphere intersections, surface normals, diffuse lighting, and鏡 specular reflections output to PPM image format.",
    image: "assets/images/cpp-raytracer.svg",
    tags: ["C++", "Linear Algebra", "Raytracing", "PPM Image"],
    githubLink: "https://github.com/",
    downloadFile: "assets/files/StudentSystem.cpp",
    codeSnippet: `Vec3 ray_color(const Ray& r, const World& world) {
    HitRecord rec;
    if (world.hit(r, 0.001, infinity, rec)) {
        return 0.5 * (rec.normal + Vec3(1, 1, 1));
    }
    return Vec3(0.05, 0.08, 0.14); // Dark sky gradient
}`
  },

  {
    title: "Isometric Developer Study Room 3D",
    category: "blender",
    description: "Stylized 3D isometric programmer room featuring dual monitors, mechanical keyboard, AKHU desk pennant, and cozy volumetric window lighting in Blender.",
    image: "assets/images/blender-room.svg",
    tags: ["Blender", "Isometric 3D", "Volumetric Light", "Cycles"],
    githubLink: "https://sketchfab.com/",
    downloadFile: "assets/files/cyber_drone.obj",
    codeSnippet: `// Scene Lighting & Camera Setup
Camera     : Orthographic (Scale 6.2, Isometric 45 deg)
Lighting   : Area Light (Cyan Key) + Warm Desk Lamp Point Light
Atmosphere : Principled Volume Scatter (Density 0.015)`
  }
];
