package org.bsuir.controller;

import org.bsuir.domain.Task;
import org.bsuir.utils.TaskManagment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/task")
public class TaskController {

	@Autowired
	private TaskManagment taskManagment;


	@RequestMapping(value = "/performed/{id}", method = RequestMethod.PUT)
	public Task performedTask(@PathVariable("id") Integer id) {
		return taskManagment.setTaskAsPerformed(id);
	}

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Task updateTask(@RequestBody Task task) {
		return taskManagment.updateTask(task);
	}

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Task createTask(@RequestBody Task task) {
		return taskManagment.createTask(task);
	}


}
