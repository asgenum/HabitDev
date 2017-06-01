package org.bsuir.repository;

import org.bsuir.domain.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
	Task findByName(String name);

	@Query("SELECT t FROM Task t WHERE LOWER(t.startTime) < LOWER(:currentTime) " +
			"AND LOWER(t.endTime) > LOWER(:currentTime) AND t.notificationSend = false")
	List<Task> findByCurrentTime(@Param("currentTime") String currentTime);

	@Query("SELECT t FROM Task t WHERE LOWER(t.startTime) < LOWER(:currentTime) " +
			"AND LOWER(t.endTime) < LOWER(:currentTime) AND t.notificationSend = true AND t.performed = false AND t.overdue = false")
	List<Task> findOverdue(@Param("currentTime") String currentTime);
}
