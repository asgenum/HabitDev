package org.bsuir.controller;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.bsuir.domain.User;
import org.bsuir.service.UserService;
import org.bsuir.utils.email.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private EmailSender emailSender;


	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ResponseEntity<User> createUser(@RequestBody User user) {
		if (userService.findByUsername(user.getUsername()) != null) {
			//throw new RuntimeException("Username already exist");
			return new ResponseEntity<User>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
		emailSender.sendMail(user.getFirstName(), user.getLastName(), user.getEmail(), "Регистрация на HabitDev");
		return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
	}

	@RequestMapping("/user")
	public User user(Principal principal) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loggedUsername = auth.getName();
		return userService.findByUsername(loggedUsername);
	}

	@RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> login(@RequestParam String username, @RequestParam String password,
													 HttpServletResponse response) throws IOException {
		String token = null;
		User appUser = userService.findByUsername(username);
		Map<String, Object> tokenMap = new HashMap<String, Object>();
		if (appUser != null && appUser.getPassword().equals(password)) {
			token = Jwts.builder().setSubject(username).claim("roles", appUser.getRoles()).setIssuedAt(new Date())
					.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
			tokenMap.put("token", token);
			tokenMap.put("user", appUser);
			return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.OK);
		} else {
			tokenMap.put("token", null);
			return new ResponseEntity<Map<String, Object>>(tokenMap, HttpStatus.UNAUTHORIZED);
		}

	}

	@RequestMapping(value = "/userbyplan/{planId}", method = RequestMethod.GET)
	public User findUserByActionPlan(@PathVariable("planId") Integer planId) {
		return userService.findByActionPlan_Id(planId);
	}

}
