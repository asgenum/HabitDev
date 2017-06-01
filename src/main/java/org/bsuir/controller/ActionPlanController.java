package org.bsuir.controller;

import org.bsuir.domain.ActionPlan;
import org.bsuir.domain.User;
import org.bsuir.service.UserService;
import org.bsuir.utils.ActionPlanManagment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/plan")
public class ActionPlanController {

	@Autowired
	private ActionPlanManagment actionPlanManagment;

	@Autowired
	private UserService userService;


	@RequestMapping(value = "/userplan", method = RequestMethod.GET)
	public List <ActionPlan> getActionPlanForUser(Principal principal) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		String loggedUsername = auth.getName();
		User user = userService.findByUsername(loggedUsername);
		return actionPlanManagment.getActionPlansByUser(user);
	}

	@RequestMapping(value = "/onlineplans", method = RequestMethod.GET)
	public List <ActionPlan> getPlansInFreeAccess() {
		return actionPlanManagment.getPlansInFreeAccess();
	}

	@RequestMapping(value = "/creatorplans/{userId}", method = RequestMethod.GET)
	public List <ActionPlan> getActionPlanForCreatorAndUser(@PathVariable("userId") Integer userId) {
		return actionPlanManagment.getActionPlanForCreatorAndUser(userId);
	}
	@RequestMapping(value = "/creator/{creatorId}", method = RequestMethod.GET)
	public List <ActionPlan> getActionPlanForCreator(@PathVariable("creatorId") Integer creatorId) {
		return actionPlanManagment.getActionPlansByCreatorId(creatorId);
	}

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public ActionPlan updateActionPlan(@RequestBody ActionPlan actionPlan) {
		return actionPlanManagment.updateActionPlan(actionPlan);
	}

	@RequestMapping(value = "/updatestate/{planId}", method = RequestMethod.PUT)
	public ActionPlan updateActionPlan(@PathVariable("planId") Integer planId) {
		return actionPlanManagment.updateActionPlanState(planId);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public void deleteActionPlan(@PathVariable Integer id) {
		actionPlanManagment.deleteActionPlan(id);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ActionPlan createActionPlan(@RequestBody ActionPlan actionPlan) {
		return actionPlanManagment.createActionPlan(actionPlan);
	}
	@RequestMapping(value = "/copy/{userId}/{actionPlanId}", method = RequestMethod.POST)
	public ActionPlan createActionPlan(@PathVariable Integer userId, @PathVariable Integer actionPlanId) {
		return actionPlanManagment.copyActionPlan(userId, actionPlanId);
	}

}
