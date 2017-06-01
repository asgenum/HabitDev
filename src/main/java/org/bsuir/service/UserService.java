package org.bsuir.service;

import org.bsuir.domain.User;

import java.util.List;

public interface UserService {

	List<User> findAll();

	User save(User user);

	User saveUser(User user);

	User saveAdmin(User user);

	User findByUsername(String username);

	User findOne(Integer id);

	void delete(Integer id);

	void delete(User user);

	User findByActionPlan_Id(Integer actionPlanId);

}
