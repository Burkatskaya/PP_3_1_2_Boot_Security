package ru.kata.spring.boot_security.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.models.User;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//    List<User> listUsers();
    User findByUsername(String username);
//    User show(int id);
//    void create(User user);
//    void update(User updateUser);
//    void delete(int id);
}
