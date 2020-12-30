package com.Kursat.springbootecommerce.repository;

import com.Kursat.springbootecommerce.model.Adress;
import com.Kursat.springbootecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AdressRepository extends JpaRepository<Adress, Integer> {
    @Modifying
    @Query(" Delete FROM Adress t WHERE t.user.id=?1")
    void  deleteAdressByUser(long id);

    @Query("SELECT t FROM Adress t WHERE t.user.id=?1")
    Adress findByIdExists(long id);

}
