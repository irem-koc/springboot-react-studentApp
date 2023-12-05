package com.arjuncodes.studnetsystem.service;

import com.arjuncodes.studnetsystem.model.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
}
