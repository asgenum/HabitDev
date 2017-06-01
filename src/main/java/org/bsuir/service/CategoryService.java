package org.bsuir.service;

import org.bsuir.domain.Category;

import java.util.List;

public interface CategoryService {

	List<Category> findAll();

	Category save(Category category);

	Category findByName(String name);

	Category findOne(Integer id);

	void delete(Integer id);

	void delete(Category category);

}
