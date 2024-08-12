package com.app.servicesImplementation;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.models.Role;
import com.app.models.User;
import com.app.repository.RoleRepository;
import com.app.repository.UserRepository;

@Service
public class InitializationService {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public void initialize() {
        // Retrieve or create the "ADMIN" role
        Optional<Role> existingRole = roleRepository.findById("ADMIN");

        Role role;
        if (existingRole.isPresent()) {
            role = existingRole.get();
        } else {
            Role newRole = Role.builder()
                .roleName("ADMIN")
                .roleDescription("Superuser, who has access to all functionality")
                .build();
            role = roleRepository.save(newRole);
        }

        // Check if the admin user already exists
        if (userRepository.findByUsername("admin") == null) {
            User adminUser = new User();
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setUsername("admin");
            adminUser.setPassword(passwordEncoder.encode("adminpassword")); // Use a strong password in production
            adminUser.setRoles(Set.of(role));
            adminUser.setActive(true);

            userRepository.save(adminUser);
        }
    }
}
