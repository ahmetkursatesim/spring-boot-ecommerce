package com.Kursat.springbootecommerce.repository;

import com.Kursat.springbootecommerce.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import com.Kursat.springbootecommerce.model.Product;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 * The Interface ProductRepository.
 *
 * @author Ahmet Kursat Esim
 * @version 1.0
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Modifying
    @Query("Update Product t SET t.name=?1,t.description=?2,t.category=?3,t.manufacturer_name=?4,t.p_code=?5,t.picture1=?6,t.piece=?7,t.price=?8 WHERE t.id=?9")
    void update(String name, String Description, Category category,String Manufacturer_name,String p_code,String picture1,int piece,float price, int id);

}
