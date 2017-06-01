package org.bsuir.service;

import org.bsuir.domain.Task;
import org.bsuir.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

	@Autowired
	private TaskRepository taskRepository;

	@Override
	public List<Task> findAll() {
		return taskRepository.findAll();
	}

	@Override
	public Task save(Task task) {
		return taskRepository.save(task);
	}

	@Override
	public Task findByName(String name) {
		return taskRepository.findByName(name);
	}

	@Override
	public Task findOne(Integer id) {
		return taskRepository.findOne(id);
	}

	@Override
	public void delete(Integer id) {
		taskRepository.delete(id);
	}

	@Override
	public void delete(Task task) {
		taskRepository.delete(task);
	}

	@Override
	public List<Task> findByCurrentTime(String currentTime) {
		return taskRepository.findByCurrentTime(currentTime);
	}

	@Override
	public List<Task> findOverdue(String currentTime) {
		return taskRepository.findOverdue(currentTime);
	}
}
