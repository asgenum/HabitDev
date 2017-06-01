package org.bsuir.repository;

import org.bsuir.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
	User findByUsername(String username);

	User findByActionPlans_Id(Integer actionPlanId);
}
