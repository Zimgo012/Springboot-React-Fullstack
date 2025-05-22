package com.example.demo.student;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.AssertionsForInterfaceTypes.assertThat;

@DataJpaTest
public class StudentRepositoryTest {

    @Autowired
    private StudentRepository underTest;

    @AfterEach
    void tearDown() {
        underTest.deleteAll();
    }

    @Test
    void itShouldCheckIfStudentExistsByEmail() {
        //given
        Student student = new Student("test",Gender.MALE,"test@mail.com");

        underTest.save(student);

        //when
        boolean exists = underTest.selectExistsEmail(student.getEmail());

        //then
        assertThat(exists).isTrue();
    }

    @Test
    void itShouldCheckIfStudentDoesNotExistsByEmail() {
        //given
        String email = "noone@email";
        //when
        boolean exists = underTest.selectExistsEmail(email);

        //then
        assertThat(exists).isFalse();
    }

}
