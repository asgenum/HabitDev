package org.bsuir.service;

import org.bsuir.domain.ActionPlan;

import java.util.List;

public interface ActionPlanService {

	List<ActionPlan> findAll();

	ActionPlan save(ActionPlan actionPlan);

	ActionPlan findByName(String name);

	ActionPlan findOne(Integer id);

	void delete(Integer id);

	void delete(ActionPlan actionPlan);

	List<ActionPlan> findByUserId(Integer userId);

	List<ActionPlan> findByCreatorAndUserId(Integer creatorId);

	List<ActionPlan> findByCreatorId(Integer creatorId);

	List<ActionPlan> findPlansInFreeAccess();

	ActionPlan findByNameAndCreatorIdAndUsers_Id(String name, Integer creatorId, Integer userId);




}
