package com.Kursat.springbootecommerce.ExModel;

import com.Kursat.springbootecommerce.Enums.Order_Status;
import com.Kursat.springbootecommerce.model.Product;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

public class OrderMasterEx {
    private Integer order_id;
    private Order_Status order_status;
    private Integer user_id;
    private Date created_at;
    private List<ProductEx> productsMasters;

    public OrderMasterEx(Integer order_id, Order_Status order_status, Integer user_id, Date created_at, List<ProductEx> productsMasters) {
        this.order_id = order_id;
        this.order_status = order_status;
        this.user_id = user_id;
        this.created_at = created_at;
        this.productsMasters = productsMasters;
    }

    public OrderMasterEx() {
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public Order_Status getOrder_status() {
        return order_status;
    }

    public void setOrder_status(Order_Status order_status) {
        this.order_status = order_status;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public Date getCreated_at() {
        return created_at;
    }

    public void setCreated_at(Date created_at) {
        this.created_at = created_at;
    }

    public List<ProductEx> getProductsMasters() {
        return productsMasters;
    }

    public void setProductsMasters(List<ProductEx> productsMasters) {
        this.productsMasters = productsMasters;
    }
}
