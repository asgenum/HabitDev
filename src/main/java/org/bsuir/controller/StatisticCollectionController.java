package org.bsuir.controller;


import org.bsuir.utils.StatisticCollection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping(value = "/statistic")
public class StatisticCollectionController {

	@Autowired
	private StatisticCollection statisticCollection;

	@RequestMapping(value = "/completed/{id}", method = RequestMethod.GET)
	public Integer getNumberOfCompletedTasks(@PathVariable("id") Integer id) {
		return statisticCollection.getNumberOfCompletedTasks(id, new Date().toString());
	}

	@RequestMapping(value = "/accepted/{id}", method = RequestMethod.GET)
	public Integer getNumberOfAcceptedPlans(@PathVariable("id") Integer id) {
		return statisticCollection.getNumberOfAcceptedPlans(id, new Date().toString());
	}

	@RequestMapping(value = "/students/{id}", method = RequestMethod.GET)
	public Integer getNumberOfActiveStudents(@PathVariable("id") Integer id) {
		return statisticCollection.getNumberOfActiveStudents(id, new Date().toString());
	}

	@RequestMapping(value = "/createdplans/{id}", method = RequestMethod.GET)
	public Integer getNumberOfCreatedPlans(@PathVariable("id") Integer id) {
		return statisticCollection.getNumberOfCreatedPlans(id, new Date().toString());
	}

	@RequestMapping(value = "/dayactivity/{id}", method = RequestMethod.GET)
	public List<Integer> getDayActivity(@PathVariable("id") Integer id) {
		return statisticCollection.getDayActivity(id, new Date().toString());
	}

	@RequestMapping(value = "/monthactivity/{id}", method = RequestMethod.GET)
	public List<Integer> getMonthActivity(@PathVariable("id") Integer id) {
		return statisticCollection.getMonthActivity(id, new Date().toString());
	}

	@RequestMapping(value = "/yearactivity/{id}", method = RequestMethod.GET)
	public List<Integer> getYearActivity(@PathVariable("id") Integer id) {
		return statisticCollection.getYearActivity(id, new Date().toString());
	}


}
