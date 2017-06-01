package org.bsuir.service;

import org.bsuir.domain.ActionPlan;
import org.bsuir.repository.ActionPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionPlanServiceImpl implements ActionPlanService {

	@Autowired
	private ActionPlanRepository actionPlanRepository;

	@Override
	public List<ActionPlan> findAll() {
		return actionPlanRepository.findAll();
	}

	@Override
	public ActionPlan save(ActionPlan actionPlan) {
		return actionPlanRepository.save(actionPlan);
	}

	@Override
	public ActionPlan findByName(String name) {
		return actionPlanRepository.findByName(name);
	}

	@Override
	public ActionPlan findOne(Integer id) {
		return actionPlanRepository.findOne(id);
	}

	@Override
	public void delete(Integer id) {
		actionPlanRepository.delete(id);
	}

	@Override
	public void delete(ActionPlan actionPlan) {
		actionPlanRepository.delete(actionPlan);
	}

	@Override
	public List<ActionPlan> findByUserId(Integer userId) {
		return actionPlanRepository.findByStatusTrueAndUsers_Id(userId);
	}

	@Override
	public List<ActionPlan> findByCreatorAndUserId(Integer creatorId) {
		return actionPlanRepository.findByCreatorIdAndUsers_Id(creatorId, creatorId);
	}

	@Override
	public List<ActionPlan> findPlansInFreeAccess() {
		return actionPlanRepository.findByOnlineAccessTrue();
	}

	@Override
	public ActionPlan findByNameAndCreatorIdAndUsers_Id(String name, Integer creatorId, Integer userId) {
		return actionPlanRepository.findByNameAndCreatorIdAndUsers_Id(name, creatorId, userId);
	}

	@Override
	public List<ActionPlan> findByCreatorId(Integer creatorId) {
		return actionPlanRepository.findByCreatorId(creatorId);
	}
}
