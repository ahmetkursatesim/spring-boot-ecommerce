package com.Kursat.springbootecommerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Kursat.springbootecommerce.model.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

/**
 * The Interface UserRepository.
 *
 * @author Ahmet Kürşat Esim
 * @version 1.0
 */
public interface UserRepository extends JpaRepository<User, String> {

    @Query("SELECT t FROM User t WHERE t.email=?1")
    User findByEmail(String email);
    @Query("SELECT t FROM User t WHERE t.id=?1 AND t.isAdmin=true")
    User findByAdmin(long id);
    @Modifying
    @Query("Update User t SET t.Picture=?1 WHERE t.email=?2")
    void update(String picture,String Email);

    @Query("SELECT t FROM User t WHERE t.id=?1")
    User findByIdExists(long id);


}
