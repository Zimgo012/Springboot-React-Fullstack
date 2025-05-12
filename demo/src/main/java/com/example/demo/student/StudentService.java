package com.example.demo.student;

import com.example.demo.student.exeptions.BadRequestException;
import com.example.demo.student.exeptions.StudentNotFoundException;
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

    public void addStudent(Student student) throws BadRequestException {
        Boolean existEmail = studentRepository.selectExistsEmail(student.getEmail());

        if(existEmail) {
            throw new BadRequestException("Student already exists");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if(!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException("Student not found");
        }
        studentRepository.deleteById(studentId);
    };

    public void editStudent(Long studentId, Student student) {
        Student oldStudent = studentRepository.findById(studentId).get();
        oldStudent.setName(student.getName());
        oldStudent.setGender(student.getGender());
        oldStudent.setEmail(student.getEmail());
        studentRepository.save(oldStudent);
    }
}
