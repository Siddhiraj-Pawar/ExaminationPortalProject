package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.models.Role;

public interface RoleRepository extends JpaRepository<Role, String> {
}
