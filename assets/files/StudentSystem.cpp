// ============================================================================
// Author: Ulug'bekov Shohjahon
// University: Al-Khwarizmi University (AKHU) - Software Engineering
// Project: AKHU Student Grading & GPA Management System (C++17)
// ============================================================================

#include <iostream>
#include <vector>
#include <string>
#include <iomanip>
#include <algorithm>

using namespace std;

struct Student {
    int id;
    string fullName;
    string major;
    double gpa;
};

class UniversitySystem {
private:
    vector<Student> students;
public:
    void addStudent(int id, string name, string major, double gpa) {
        students.push_back({id, name, major, gpa});
    }

    void displayAll() const {
        cout << "========================================================\n";
        cout << "   AL-KHWARIZMI UNIVERSITY (AKHU) - STUDENT REGISTRY    \n";
        cout << "========================================================\n";
        cout << left << setw(8) << "ID" << setw(26) << "Full Name" << setw(14) << "Major" << "GPA\n";
        cout << "--------------------------------------------------------\n";
        for (const auto& s : students) {
            cout << left << setw(8) << s.id
                 << setw(26) << s.fullName
                 << setw(14) << s.major
                 << fixed << setprecision(2) << s.gpa << "\n";
        }
        cout << "========================================================\n";
    }
};

int main() {
    UniversitySystem akhu;
    akhu.addStudent(1001, "Ulug'bekov Shohjahon", "Software Eng", 4.00);
    akhu.addStudent(1002, "Karimov Sardor", "Software Eng", 3.85);
    akhu.displayAll();
    return 0;
}
