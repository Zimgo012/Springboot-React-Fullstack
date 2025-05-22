package com.example.demo.student;

import com.example.demo.student.exeptions.BadRequestException;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.BDDMockito.given;


class StudentServiceTest {

    @ExtendWith(MockitoExtension.class)
    @Mock
    private StudentRepository studentRepository;
    private StudentService underTest;

    @BeforeEach
    void setUp() {
        underTest = new StudentService(studentRepository);
    }


    @AfterEach
    void tearDown() throws Exception {
    }

    @Test
    void canGetAllStudents() {
      //when
        underTest.getAllStudents();
      //then
      verify(studentRepository).findAll();
    }

    @Test
    void canAddStudent() {
        //when
        Student student = new Student("test",Gender.MALE,"test@mail.com");

        underTest.addStudent(student);

        //then
       ArgumentCaptor<Student> captor =
               ArgumentCaptor.forClass(Student.class);

       verify(studentRepository).save(captor.capture());

       Student capturedStudent = captor.getValue();

       assert capturedStudent.getName().equals(student.getName());
    }

    @Test
    void willThrowWhenEmailIsTaken() {
        //when
        Student student = new Student("test",Gender.MALE,"test@mail.com");

        given(studentRepository.selectExistsEmail(student.getEmail()))
                .willReturn(true);
        //when

        //then
        assertThatThrownBy(() -> underTest.addStudent(student))
                .isInstanceOf(BadRequestException.class)
                .hasMessageContaining("Student already exists");

        verify(studentRepository, never()).save(any());

    }

    @Test
    void deleteStudent() {

    }

    @Test
    void editStudent() {
    }
}