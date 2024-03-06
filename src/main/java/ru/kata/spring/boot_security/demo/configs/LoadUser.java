package ru.kata.spring.boot_security.demo.configs;

import org.springframework.stereotype.Component;
import ru.kata.spring.boot_security.demo.models.Role;
import ru.kata.spring.boot_security.demo.models.User;
import ru.kata.spring.boot_security.demo.repositories.RoleRepository;
import ru.kata.spring.boot_security.demo.services.UserService;

import javax.annotation.PostConstruct;
import java.util.Set;

@Component
public class LoadUser {
    private final UserService userService;
    private final RoleRepository roleRepository;

    public LoadUser(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }

    @PostConstruct
    public void loadUsers() {
        Role user = new Role("ROLE_USER");
        Role admin = new Role("ROLE_ADMIN");

        roleRepository.save(user);
        roleRepository.save(admin);

        User userUser = new User("user@mail.ru", "user", "user", Set.of(user));
        User adminUser = new User("admin@mail.ru", "admin", "admin", Set.of(admin));

        userService.create(userUser);
        userService.create(adminUser);
    }
}
