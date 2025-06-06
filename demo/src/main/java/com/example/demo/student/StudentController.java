package com.example.demo.student;

import com.example.demo.student.exeptions.BadRequestException;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "/api/v1/students")
@AllArgsConstructor
@Controller
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public List<Student> getAllStudents() {
      return studentService.getAllStudents();
    };

    @PostMapping
    public void addStudent(@Valid @RequestBody Student student) throws BadRequestException {
        studentService.addStudent(student);
    }

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId) {
        studentService.deleteStudent(studentId);
    }

    @PutMapping(path="{studentId}")
    public void updateStudent(@PathVariable("studentId") Long studentId, @RequestBody Student student) {
        studentService.editStudent(studentId, student);
    }


}
