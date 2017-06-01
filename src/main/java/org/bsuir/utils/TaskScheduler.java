package org.bsuir.utils;


import org.bsuir.domain.ActionPlan;
import org.bsuir.domain.Task;
import org.bsuir.domain.User;
import org.bsuir.service.TaskService;
import org.bsuir.service.UserService;
import org.bsuir.utils.email.EmailSender;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class TaskScheduler {

	@Autowired
	private UserService userService;

	@Autowired
	private TaskService taskService;

	@Autowired
	private EmailSender emailSender;

	//private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/M/dd hh:mm:ss a");
	private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy/M/dd HH:mm:ss");

	@Scheduled(fixedRate = 3000)
	public void sendNotification() {

		List<Task> task = taskService.findByCurrentTime(dateFormat.format(new Date()).toString());

		System.out.println("Current task: " + task);
		if (task != null) {
			for (int i = 0; i < task.size(); i++) {
				ActionPlan actionPlan = task.get(i).getActionPlans().get(0);
				if (actionPlan.isStatus()) {
					User user = actionPlan.getUsers().get(0);
					emailSender.sendMail(user.getFirstName(), user.getLastName(), user.getEmail(), task.get(i).getName());
					task.get(i).setNotificationSend(true);
					taskService.save(task.get(i));
				}
			}
		}

		List<Task> tasksOverdue = taskService.findOverdue(dateFormat.format(new Date()).toString());
		System.out.println("Overdue task: " + tasksOverdue);
		if (tasksOverdue != null) {
			for (int i = 0; i < tasksOverdue.size(); i++) {
				ActionPlan actionPlan = tasksOverdue.get(i).getActionPlans().get(0);
				if (actionPlan.isStatus()) {
					User user = actionPlan.getUsers().get(0);
					emailSender.sendMail(user.getFirstName(), user.getLastName(), user.getEmail(), tasksOverdue.get(i).getName() + " просрочен");
					tasksOverdue.get(i).setOverdue(true);
					taskService.save(tasksOverdue.get(i));
				}
			}
		}

	}
}
