package com.Kursat.springbootecommerce.model;

import com.mysql.cj.jdbc.Blob;

import javax.persistence.*;
import java.util.List;

/**
 * The Class Product.
 *
 * @author Ahmet Kursat Esim
 * @version 1.0
 */
@Entity
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id", unique = true, nullable = false)
	private Integer id;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@Column(name = "piece")
	private Integer piece;
	@Column(name = "price", nullable = false)
	private double price;
	@Column(name = "picture1")
	private String picture1;
	@Column(name = "p_code")
	private String p_code;
	@Column(name = "manufacturer_name")
	private String manufacturer_name;
	@Column(name = "created_user_Id")
	private Integer created_user_Id;
	@Column(name = "updated_user_Id")
	private Integer updated_user_Id;

	@ManyToOne
	private Category category;
	@ManyToMany(mappedBy = "productsMasters")
	private List<OrderMaster> orders;

	public Product(Integer id, String name, String description, Integer piece, double price, String picture1, String p_code, String manufacturer_name, Integer created_user_Id, Integer updated_user_Id, Category category, List<OrderMaster> orders) {
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
		this.orders = orders;
	}



	public Product() {
	}

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

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
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

	public List<OrderMaster> getOrders() {
		return orders;
	}

	public void setOrders(List<OrderMaster> orders) {
		this.orders = orders;
	}
}
