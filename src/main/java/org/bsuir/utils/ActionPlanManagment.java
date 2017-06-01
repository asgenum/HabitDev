package org.bsuir.utils;

import org.bsuir.domain.ActionPlan;
import org.bsuir.domain.Task;
import org.bsuir.domain.User;
import org.bsuir.service.ActionPlanService;
import org.bsuir.service.TaskService;
import org.bsuir.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class ActionPlanManagment {

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/M/dd hh:mm:ss a");
	private static final SimpleDateFormat dateFormatHH = new SimpleDateFormat("yyyy/M/dd HH:mm:ss");

	@Autowired
	private ActionPlanService actionPlanService;

	@Autowired
	private TaskService taskService;

	@Autowired
	private UserService userService;


	public List<ActionPlan> getActionPlansByUser(User user) {
		List<ActionPlan> actionPlanList = actionPlanService.findByUserId(user.getId());

		for (int i = 0; i < actionPlanList.size(); i++) {
			ActionPlan actionPlan = actionPlanList.get(i);
			List<Task> tasks = actionPlan.getTasks();
			for (int j = 0; j < tasks.size(); j++) {
				tasks.get(j).setStartTime(dateFormat.format(new Date(tasks.get(j).getStartTime())).toString());
				tasks.get(j).setEndTime(dateFormat.format(new Date(tasks.get(j).getEndTime())).toString());
			}
		}

		return actionPlanList;
	}

	public List<ActionPlan> getActionPlanForCreatorAndUser(Integer userId) {
		List<ActionPlan> actionPlanList = actionPlanService.findByCreatorAndUserId(userId);

		for (int i = 0; i < actionPlanList.size(); i++) {
			ActionPlan actionPlan = actionPlanList.get(i);
			List<Task> tasks = actionPlan.getTasks();
			for (int j = 0; j < tasks.size(); j++) {
				tasks.get(j).setStartTime(dateFormat.format(new Date(tasks.get(j).getStartTime())).toString());
				tasks.get(j).setEndTime(dateFormat.format(new Date(tasks.get(j).getEndTime())).toString());
			}
		}

		return actionPlanList;
	}

	public ActionPlan updateActionPlan(ActionPlan actionPlan) {

		System.out.println(actionPlan);
		System.out.println(new Date(new Timestamp(Long.parseLong(actionPlan.getStartTime())).getTime()));
		System.out.println("///////////////////////////////////");
		ActionPlan selectedActionPlan = actionPlanService.findOne(actionPlan.getId());
		selectedActionPlan.setName(actionPlan.getName());
		selectedActionPlan.setDescription(actionPlan.getDescription());
		selectedActionPlan.setStartTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(actionPlan.getStartTime())).getTime())).toString());
		selectedActionPlan.setEndTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(actionPlan.getEndTime())).getTime())).toString());
		selectedActionPlan.setStatus(actionPlan.isStatus());
		selectedActionPlan.setOnlineAccess(actionPlan.isOnlineAccess());
		return actionPlanService.save(selectedActionPlan);
	}

	public void deleteActionPlan(Integer id) {
		ActionPlan actionPlan = actionPlanService.findOne(id);
		User user = actionPlan.getUsers().get(0);
		user.getActionPlans().remove(actionPlan);


		for (int i = 0; i < actionPlan.getTasks().size(); i++) {
			int taskId = actionPlan.getTasks().get(i).getId();
			actionPlan.getTasks().remove(i);
			taskService.delete(taskId);
		}
		actionPlanService.delete(actionPlan);

	}

	public ActionPlan createActionPlan(ActionPlan actionPlan) {

		ActionPlan selectedActionPlan = new ActionPlan();
		selectedActionPlan.setName(actionPlan.getName());
		selectedActionPlan.setDescription(actionPlan.getDescription());
		selectedActionPlan.setStartTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(actionPlan.getStartTime())).getTime())).toString());
		selectedActionPlan.setEndTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(actionPlan.getEndTime())).getTime())).toString());
		selectedActionPlan.setStatus(actionPlan.isStatus());
		selectedActionPlan.setOnlineAccess(actionPlan.isOnlineAccess());
		selectedActionPlan.setCreatorId(actionPlan.getCreatorId());
		User user = userService.findOne(actionPlan.getCreatorId());
		user.getActionPlans().add(selectedActionPlan);
		return actionPlanService.save(selectedActionPlan);
	}

	public ActionPlan updateActionPlanState(Integer planId) {
		ActionPlan selectedActionPlan = actionPlanService.findOne(planId);
		System.out.println(selectedActionPlan.getNumberOfTasks());
		if (selectedActionPlan.getNumberOfTasks() == null || selectedActionPlan.getNumberOfTasks() <= 0) {
			selectedActionPlan.setNumberOfTasks(new Integer(1));
		} else {
			selectedActionPlan.setNumberOfTasks(selectedActionPlan.getNumberOfTasks() + 1);
		}
		return actionPlanService.save(selectedActionPlan);
	}


	public List<ActionPlan> getPlansInFreeAccess() {
		return actionPlanService.findPlansInFreeAccess();
	}

	public ActionPlan copyActionPlan(Integer userId, Integer actionPlanId) {
		User user = userService.findOne(userId);

		ActionPlan oldActionPlan = actionPlanService.findOne(actionPlanId);
		ActionPlan newActionPlan = new ActionPlan();

		if (actionPlanService.findByNameAndCreatorIdAndUsers_Id(oldActionPlan.getName(), oldActionPlan.getCreatorId(), user.getId()) == null) {
			List <Task> oldTasksList = oldActionPlan.getTasks();
			List <Task> newTasksList = new ArrayList<>();

			SimpleDateFormat sdf = new SimpleDateFormat("yyyy/M/dd");
			Date currentDate = null;

			try {
				currentDate = sdf.parse(sdf.format(new Date()));
			} catch (Exception e) {
				System.out.println(e);
			}

			newActionPlan.setName(oldActionPlan.getName());
			newActionPlan.setDescription(oldActionPlan.getDescription());
			newActionPlan.setStartTime(oldActionPlan.getStartTime());
			newActionPlan.setEndTime(oldActionPlan.getEndTime());
			newActionPlan.setStatus(true);
			newActionPlan.setOnlineAccess(false);
			newActionPlan.setCreatorId(oldActionPlan.getCreatorId());
			newActionPlan.setNumberOfTasks(oldActionPlan.getNumberOfTasks());

			user.getActionPlans().add(newActionPlan);
			actionPlanService.save(newActionPlan);

			for (int i = 0; i < oldTasksList.size(); i++) {
				Task selectedTask = new Task();
				selectedTask.setName(oldTasksList.get(i).getName());
				selectedTask.setDescription(oldTasksList.get(i).getDescription());
				selectedTask.setStartTime(dateFormatHH.format(new Date(new Timestamp(currentDate.getTime() + 64800000 + (86400000 * (i+1))).getTime())).toString());
				selectedTask.setEndTime(dateFormatHH.format(new Date(new Timestamp(currentDate.getTime() + 64800000 + (86400000 * (i+1)) + 3600000).getTime())).toString());
				selectedTask.setPerformed(false);
				selectedTask.setOverdue(false);
				selectedTask.setNotificationSend(false);
				selectedTask.setContent(oldTasksList.get(i).getContent());
				newActionPlan.getTasks().add(selectedTask);
				List<ActionPlan> list = new ArrayList<>();
				list.add(newActionPlan);
				selectedTask.setActionPlans(list);
				taskService.save(selectedTask);
			}
			newActionPlan.setStartTime(newActionPlan.getTasks().get(0).getStartTime());
			newActionPlan.setEndTime(newActionPlan.getTasks().get(newActionPlan.getTasks().size() - 1).getEndTime());

			return actionPlanService.save(newActionPlan);
		}

		return null;
	}

	public List<ActionPlan> getActionPlansByCreatorId(Integer creatorId) {
		return actionPlanService.findByCreatorId(creatorId);
	}

}
