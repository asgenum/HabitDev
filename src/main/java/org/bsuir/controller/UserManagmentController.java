package org.bsuir.controller;

import org.bsuir.domain.User;
import org.bsuir.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class UserManagmentController {

	@Autowired
	private UserService userService;

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/users", method = RequestMethod.GET)
	public List<User> users() {
		return userService.findAll();
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.GET)
	public ResponseEntity<User> userById(@PathVariable Integer id) {
		User user = userService.findOne(id);
		if (user == null) {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/users/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<User> deleteUser(@PathVariable Integer id) {
		User user = userService.findOne(id);
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loggedUsername = auth.getName();
		if (user == null) {
			return new ResponseEntity<User>(HttpStatus.NO_CONTENT);
		} else if (user.getUsername().equalsIgnoreCase(loggedUsername)) {
			throw new RuntimeException("You cannot delete your account");
		} else {
			userService.delete(user);
			return new ResponseEntity<User>(user, HttpStatus.OK);
		}
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/users", method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User user) {
		if (userService.findByUsername(user.getUsername()) != null) {
			throw new RuntimeException("Username already exist");
		}
		System.out.println(user);
		return new ResponseEntity<User>(userService.save(user), HttpStatus.CREATED);
	}

	@PreAuthorize("hasRole('ADMIN')")
	@RequestMapping(value = "/users", method = RequestMethod.PUT)
	public User updateUser(@RequestBody User user) {
		if (userService.findByUsername(user.getUsername()) != null
				&& userService.findByUsername(user.getUsername()).getId() != user.getId()) {
			throw new RuntimeException("Username already exist");
		}
		return userService.save(user);
	}
}
