package org.bsuir.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "action_plan")
public class ActionPlan{

	@Id
	@Column(unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	private String description;

	private Integer numberOfTasks;

	private String startTime;

	private String endTime;

	private boolean status;

	private boolean onlineAccess;

	private Integer creatorId;

	private Integer rating;

	@JsonIgnore
	@ManyToMany(mappedBy = "actionPlans", fetch = FetchType.EAGER)
	private List<User> users;

	@ElementCollection
	@ManyToMany
	@JoinTable(name = "action_plan_has_category", joinColumns = @JoinColumn(name = "action_plan_id"), inverseJoinColumns = @JoinColumn(name = "category_id"))
	private List<Category> categories = new ArrayList<>();

	@ElementCollection
	@ManyToMany
	@JoinTable(name = "action_plan_has_task", joinColumns = @JoinColumn(name = "action_plan_id"), inverseJoinColumns = @JoinColumn(name = "task_id"))
	private List<Task> tasks = new ArrayList<>();


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

	public Integer getNumberOfTasks() {
		return numberOfTasks;
	}

	public void setNumberOfTasks(Integer numberOfTasks) {
		this.numberOfTasks = numberOfTasks;
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

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public boolean isOnlineAccess() {
		return onlineAccess;
	}

	public void setOnlineAccess(boolean onlineAccess) {
		this.onlineAccess = onlineAccess;
	}

	public Integer getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "ActionPlan{" +
				"id=" + id +
				", name='" + name + '\'' +
				", description='" + description + '\'' +
				", numberOfTasks=" + numberOfTasks +
				", startTime='" + startTime + '\'' +
				", endTime='" + endTime + '\'' +
				", status=" + status +
				", onlineAccess=" + onlineAccess +
				", creatorId=" + creatorId +
				", users=" + users +
				'}';
	}
}
