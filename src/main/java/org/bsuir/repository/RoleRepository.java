package org.bsuir.repository;

import org.bsuir.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Integer> {
	Role findByName(String name);
}
