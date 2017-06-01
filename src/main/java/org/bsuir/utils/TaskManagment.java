package org.bsuir.utils;

import org.bsuir.domain.ActionPlan;
import org.bsuir.domain.Task;
import org.bsuir.service.ActionPlanService;
import org.bsuir.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Component
public class TaskManagment {

	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/M/dd hh:mm:ss a");
	private static final SimpleDateFormat dateFormatHH = new SimpleDateFormat("yyyy/M/dd HH:mm:ss");

	@Autowired
	private TaskService taskService;

	@Autowired
	private ActionPlanService actionPlanService;

	public Task setTaskAsPerformed(Integer taskId) {
		Task task = taskService.findOne(taskId);
		task.setPerformed(true);
		return taskService.save(task);
	}

	public Task updateTask(Task task) {
		System.out.println(task);
		Task selectedTask = taskService.findOne(task.getId());
		selectedTask.setName(task.getName());
		selectedTask.setDescription(task.getDescription());
		selectedTask.setStartTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(task.getStartTime())).getTime())).toString());
		selectedTask.setEndTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(task.getEndTime())).getTime())).toString());
		selectedTask.setPerformed(task.isPerformed());
		selectedTask.setOverdue(task.isOverdue());
		selectedTask.setNotificationSend(task.isNotificationSend());
		selectedTask.setContent(task.getContent());
		return taskService.save(selectedTask);
	}

	public Task createTask(Task task) {
		System.out.println(task);
		ActionPlan actionPlan = actionPlanService.findOne(task.getId());
		Task selectedTask = new Task();
		selectedTask.setName(task.getName());
		selectedTask.setDescription(task.getDescription());
		selectedTask.setStartTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(task.getStartTime())).getTime())).toString());
		selectedTask.setEndTime(dateFormatHH.format(new Date(new Timestamp(Long.parseLong(task.getEndTime())).getTime())).toString());
		selectedTask.setPerformed(task.isPerformed());
		selectedTask.setOverdue(task.isOverdue());
		selectedTask.setNotificationSend(task.isNotificationSend());
		selectedTask.setContent(task.getContent());
		actionPlan.getTasks().add(selectedTask);
		List<ActionPlan> list = new ArrayList<ActionPlan>();
		list.add(actionPlan);
		selectedTask.setActionPlans(list);
		return taskService.save(selectedTask);
	}

}
