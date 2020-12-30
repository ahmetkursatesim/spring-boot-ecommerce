package com.Kursat.springbootecommerce.repository;
import com.Kursat.springbootecommerce.Enums.Order_Status;
import com.Kursat.springbootecommerce.model.OrderMaster;
import com.Kursat.springbootecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderMasterRepository extends JpaRepository<OrderMaster, Integer> {
    @Query("SELECT t FROM OrderMaster t WHERE t.user_id=?1")
    List<OrderMaster> findByUser_id(Integer userId);

    @Modifying
    @Query("Update OrderMaster t SET t.order_status=?1 WHERE t.order_id=?2")
    void updateStatus(Order_Status order_status, Integer orderId);


}
