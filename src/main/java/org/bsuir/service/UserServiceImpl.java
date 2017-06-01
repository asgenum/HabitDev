package org.bsuir.service;

import org.bsuir.domain.Role;
import org.bsuir.domain.User;
import org.bsuir.repository.RoleRepository;
import org.bsuir.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;


	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public User save(User user) {

		List<Role> oldRoles = user.getRoles();
		List<Role> newRoles = new ArrayList<>();


		for (int i = 0; i < oldRoles.size(); i++) {
			Role role = oldRoles.get(i);
			newRoles.add(roleRepository.findByName(role.getName()));
		}
		user.setRoles(newRoles);
		oldRoles.clear();
		return userRepository.save(user);
	}

	@Override
	public User saveUser(User user) {
		Role userRole = roleRepository.findByName("USER");
		List<Role> roles = new ArrayList<>();
		roles.add(userRole);
		user.setRoles(roles);
		return userRepository.save(user);
	}

	@Override
	public User saveAdmin(User user) {
		Role userRole = roleRepository.findByName("USER");
		Role adminRole = roleRepository.findByName("ADMIN");
		List<Role> roles = new ArrayList<>();
		roles.add(userRole);
		roles.add(adminRole);
		user.setRoles(roles);
		return userRepository.save(user);
	}

	@Override
	public User findByUsername(String username) {
		return userRepository.findByUsername(username);
	}

	@Override
	public User findOne(Integer id) {
		return userRepository.findOne(id);
	}

	@Override
	public void delete(Integer id) {
		userRepository.delete(id);
	}

	@Override
	public void delete(User user) {
		List<Role> oldRoles = user.getRoles();
		List<Role> newRoles = new ArrayList<>();

		for (int i = 0; i < oldRoles.size(); i++) {
			Role role = oldRoles.get(i);
			newRoles.add(roleRepository.findByName(role.getName()));
		}
		user.setRoles(newRoles);
		oldRoles.clear();
		userRepository.delete(user);
	}

	@Override
	public User findByActionPlan_Id(Integer actionPlanId) {
		return userRepository.findByActionPlans_Id(actionPlanId);
	}
}
