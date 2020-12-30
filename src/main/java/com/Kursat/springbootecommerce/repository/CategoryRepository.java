package com.Kursat.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Kursat.springbootecommerce.model.Category;

/**
 * The Interface CategoryRepository.
 *
 * @author Ahmet Kursat Esim
 * @version 1.0
 */
public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
