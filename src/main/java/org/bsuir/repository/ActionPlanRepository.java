package org.bsuir.repository;

import org.bsuir.domain.ActionPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ActionPlanRepository extends JpaRepository<ActionPlan, Integer> {

	ActionPlan findByName(String name);

	List<ActionPlan> findByStatusTrueAndUsers_Id(Integer userId);

	List<ActionPlan> findByOnlineAccessTrue();

	List<ActionPlan> findByCreatorIdAndUsers_Id(Integer userId, Integer creatorId);

	List<ActionPlan> findByCreatorId(Integer creatorId);

	ActionPlan findByNameAndCreatorIdAndUsers_Id(String name, Integer creatorId, Integer userId);

}
