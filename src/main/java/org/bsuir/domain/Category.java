package org.bsuir.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "category")
public class Category{

	@Id
	@Column(unique = true)
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	private String name;

	private String description;

	@JsonIgnore
	@ManyToMany(mappedBy = "categories")
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

	public List<ActionPlan> getActionPlans() {
		return actionPlans;
	}

	public void setActionPlans(List<ActionPlan> actionPlans) {
		this.actionPlans = actionPlans;
	}
}
