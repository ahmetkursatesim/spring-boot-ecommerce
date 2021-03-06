package com.Kursat.springbootecommerce.ExModel;

import com.Kursat.springbootecommerce.model.Category;

public class ProductEx {
    private Integer id;
    private String name;
    private String description;
    private Integer piece;
    private float price;
    private String picture1;
    private String p_code;
    private String manufacturer_name;
    private Integer created_user_Id;
    private Integer updated_user_Id;

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

    public Integer getPiece() {
        return piece;
    }

    public void setPiece(Integer piece) {
        this.piece = piece;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getPicture1() {
        return picture1;
    }

    public void setPicture1(String picture1) {
        this.picture1 = picture1;
    }

    public String getP_code() {
        return p_code;
    }

    public void setP_code(String p_code) {
        this.p_code = p_code;
    }


    public String getManufacturer_name() {
        return manufacturer_name;
    }

    public void setManufacturer_name(String manufacturer_name) {
        this.manufacturer_name = manufacturer_name;
    }

    public Integer getCreated_user_Id() {
        return created_user_Id;
    }

    public void setCreated_user_Id(Integer created_user_Id) {
        this.created_user_Id = created_user_Id;
    }

    public Integer getUpdated_user_Id() {
        return updated_user_Id;
    }

    public void setUpdated_user_Id(Integer updated_user_Id) {
        this.updated_user_Id = updated_user_Id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getOrderQuantity() {
        return OrderQuantity;
    }

    public void setOrderQuantity(Integer orderQuantity) {
        OrderQuantity = orderQuantity;
    }

    private Category category;
    private Integer OrderQuantity;
    public ProductEx() {
    }

    public ProductEx(Integer id, String name, String description, Integer piece, float price, String picture1, String p_code, String manufacturer_name, Integer created_user_Id, Integer updated_user_Id, Category category, Integer orderQuantity) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.piece = piece;
        this.price = price;
        this.picture1 = picture1;
        this.p_code = p_code;
        this.manufacturer_name = manufacturer_name;
        this.created_user_Id = created_user_Id;
        this.updated_user_Id = updated_user_Id;
        this.category = category;
        OrderQuantity = orderQuantity;
    }
}
