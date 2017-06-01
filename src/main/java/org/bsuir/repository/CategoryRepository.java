package org.bsuir.repository;

import org.bsuir.domain.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	Category findByName(String name);
}
