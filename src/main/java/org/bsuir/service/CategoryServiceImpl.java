package org.bsuir.service;

import org.bsuir.domain.Category;
import org.bsuir.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public List<Category> findAll() {
		return categoryRepository.findAll();
	}

	@Override
	public Category save(Category category) {
		return categoryRepository.save(category);
	}

	@Override
	public Category findByName(String name) {
		return categoryRepository.findByName(name);
	}

	@Override
	public Category findOne(Integer id) {
		return categoryRepository.findOne(id);
	}

	@Override
	public void delete(Integer id) {
		categoryRepository.delete(id);
	}

	@Override
	public void delete(Category category) {
		categoryRepository.delete(category);
	}
}
