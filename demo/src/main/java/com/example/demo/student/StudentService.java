package com.example.demo.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        studentRepository.deleteById(studentId);
    };

    public void editStudent(Long studentId, Student student) {
        Student oldStudent = studentRepository.findById(studentId).get();
        oldStudent.setName(student.getName());
        oldStudent.setGender(student.getGender());
        studentRepository.save(oldStudent);
    }
}
