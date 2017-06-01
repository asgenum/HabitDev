package org.bsuir.service;

import org.bsuir.domain.Task;

import java.util.List;

public interface TaskService {

	List<Task> findAll();

	Task save(Task task);

	Task findByName(String name);

	Task findOne(Integer id);

	void delete(Integer id);

	void delete(Task task);

	List<Task> findByCurrentTime(String currentTime);

	List<Task> findOverdue(String currentTime);

}
