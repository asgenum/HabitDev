package org.bsuir.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "task")
public class Task{

	@Id
	@Column(unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	private String description;

	private String startTime;

	private String endTime;

	private boolean performed;

	private boolean overdue;

	private String content;

	private boolean notificationSend;

	@JsonIgnore
	@ManyToMany(mappedBy = "tasks", fetch = FetchType.EAGER)
	private List<ActionPlan> actionPlans;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public boolean isPerformed() {
		return performed;
	}

	public void setPerformed(boolean performed) {
		this.performed = performed;
	}

	public boolean isOverdue() {
		return overdue;
	}

	public void setOverdue(boolean overdue) {
		this.overdue = overdue;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<ActionPlan> getActionPlans() {
		return actionPlans;
	}

	public void setActionPlans(List<ActionPlan> actionPlans) {
		this.actionPlans = actionPlans;
	}

	public boolean isNotificationSend() {
		return notificationSend;
	}

	public void setNotificationSend(boolean notificationSend) {
		this.notificationSend = notificationSend;
	}

	@Override
	public String toString() {
		return "Task{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", performed=" + performed +
				", overdue=" + overdue +
				", content='" + content + '\'' +
				", actionPlans=" + actionPlans +
				", notificationSend=" + notificationSend +
				'}';
	}
}
