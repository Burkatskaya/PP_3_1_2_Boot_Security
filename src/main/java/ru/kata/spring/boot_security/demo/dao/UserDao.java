package ru.kata.spring.boot_security.demo.dao;

import ru.kata.spring.boot_security.demo.model.User;

import java.util.List;

public interface UserDao {
    List<User> listUsers();
    User show(int id);
    void save(User user);
    void update(User updateUser);
    void delete(int id);
}
