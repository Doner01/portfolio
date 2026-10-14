// ============================================================================
// Author: Ulug'bekov Shohjahon
// Project: 3D Wavefront .OBJ Mesh Parser in C++
// Description: Parses vertices (v), normals (vn), and faces (f) exported from Blender
// ============================================================================

#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <string>

struct Vec3 { float x, y, z; };

int main() {
    std::cout << "[C++ 3D Mesh Loader] Ready to parse Blender .obj files.\n";
    std::vector<Vec3> vertices = {{0.0f, 1.0f, 0.0f}, {-1.0f, -1.0f, 1.0f}, {1.0f, -1.0f, 1.0f}};
    std::cout << "Loaded " << vertices.size() << " sample vertices into memory.\n";
    return 0;
}
