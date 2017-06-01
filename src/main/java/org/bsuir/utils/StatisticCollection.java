package org.bsuir.utils;

import org.bsuir.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class StatisticCollection {

	@Autowired
	private UserService userService;


	public Integer getNumberOfCompletedTasks(Integer userId, String date) {
		return null;
	}

	public Integer getNumberOfAcceptedPlans(Integer userId, String date) {
		return null;
	}

	public Integer getNumberOfActiveStudents(Integer userId, String date) {
		return null;
	}

	public Integer getNumberOfCreatedPlans(Integer userId, String date) {
		return null;
	}

	public List<Integer> getDayActivity(Integer userId, String date) {
		return null;
	}
	public List<Integer> getMonthActivity(Integer userId, String date) {
		return null;
	}
	public List<Integer> getYearActivity(Integer userId, String date) {
		return null;
	}
}
