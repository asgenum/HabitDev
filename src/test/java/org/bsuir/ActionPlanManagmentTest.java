package org.bsuir;

import org.bsuir.service.ActionPlanService;
import org.bsuir.service.TaskService;
import org.bsuir.service.UserService;
import org.bsuir.utils.ActionPlanManagment;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class ActionPlanManagmentTest {

	@Mock
	private ActionPlanService actionPlanService;

	@Mock
	private TaskService taskService;

	@Mock
	private UserService userService;

	@InjectMocks
	private ActionPlanManagment actionPlanManagment;

	@Test
	public void createActionPlanTest() {
	}
}
