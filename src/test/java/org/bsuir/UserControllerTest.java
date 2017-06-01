package org.bsuir;

import org.bsuir.controller.UserController;
import org.bsuir.domain.User;
import org.bsuir.service.UserService;
import org.bsuir.utils.email.EmailSender;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.springframework.http.ResponseEntity;

import java.util.Map;

//@RunWith(SpringRunner.class)
//@SpringBootTest
@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

//	@Autowired
//	private UserController userController;


	@Mock
	private UserService userService;

	@Mock
	private User user;

	@Mock
	private EmailSender emailSender;

	@InjectMocks
	private UserController userController;

	@Test
	public void authorizationTest() throws Exception {
		Mockito.when(userService.findByUsername("admin")).thenReturn(user);
		Mockito.when(user.getUsername()).thenReturn("admin");
		Mockito.when(user.getPassword()).thenReturn("admin");
		ResponseEntity<Map<String, Object>> result =  userController.login(user.getUsername(), user.getPassword(), null);
		Mockito.verify(userService, Mockito.times(1)).findByUsername("admin");
	}

	@Test
	public void createUserTest() throws Exception {
		Mockito.when(userService.findByUsername("user")).thenReturn(null);
		Mockito.when(user.getUsername()).thenReturn("user");
		Mockito.when(user.getPassword()).thenReturn("user");
		Mockito.when(user.getEmail()).thenReturn("user@gmail.com");
		Mockito.when(emailSender.sendMail(user.getUsername(), user.getPassword(), user.getEmail(), null)).thenReturn(true);
		Mockito.when(userService.saveUser(user)).thenReturn(user);
		ResponseEntity<User> result =  userController.createUser(user);
		Mockito.verify(userService, Mockito.times(1)).saveUser(user);
	}
}
