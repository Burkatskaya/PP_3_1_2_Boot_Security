package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.services.UserService;

import java.util.List;


@RestController
@RequestMapping("/api/admin")
public class AdminRestController {
    private final UserService userService;

    public AdminRestController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<User>> showUsers() {
        return new ResponseEntity<>(userService.listUsers(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<User> create(@RequestBody User user) {
        userService.create(user);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/edit")
    public ResponseEntity<User> edit(@RequestParam("id") int id) {
        return new ResponseEntity<>(userService.show(id), HttpStatus.OK);
    }

    @PostMapping("/edit")
    public ResponseEntity<User> update(@RequestBody User user, @RequestParam("id") int id) {
        user.setId(id);
        userService.update(user, id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping("/delete")
    public ResponseEntity<HttpStatus> delete(@RequestParam("id") int id) {
        userService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
