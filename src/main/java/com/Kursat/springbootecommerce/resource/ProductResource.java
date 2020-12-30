package com.Kursat.springbootecommerce.resource;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.Kursat.springbootecommerce.model.Product;
import com.Kursat.springbootecommerce.model.User;
import com.Kursat.springbootecommerce.repository.ProductRepository;
import com.Kursat.springbootecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * The Class ProductResource.
 *
 * @author Ahmet Kursat Esim
 * @version 1.0
 */
@RestController
@RequestMapping("/api/products")
@CrossOrigin("*")
public class ProductResource {
	@Autowired
	private ProductRepository productRepository;
	@Autowired
	private UserRepository userRepository;
	@GetMapping(value = "/all/{id}")
	public List<Product> getAll(@PathVariable String id) {
		User tmp=userRepository.findByAdmin(Long.valueOf(id));
		try{
			if(tmp.isAdmin()){
				List<Product> result=productRepository.findAll();
				result.forEach(f -> f.setCreated_user_Id(-1));
				result.forEach(f -> f.setUpdated_user_Id(-1));
				result.forEach(f->f.setOrders(null));
				return result ;

			}else{

				List<Product> result=productRepository.findAll().stream().filter(p -> p.getPiece() > 0).collect(Collectors.toList());
				result.forEach(f -> f.setCreated_user_Id(-1));
				result.forEach(f -> f.setUpdated_user_Id(-1));
				result.forEach(f->f.setOrders(null));
				return result;
			}
		} catch (Exception w){
			List<Product> result=productRepository.findAll().stream().filter(p -> p.getPiece() > 0).collect(Collectors.toList());
			result.forEach(f -> f.setCreated_user_Id(-1));
			result.forEach(f -> f.setUpdated_user_Id(-1));
			result.forEach(f->f.setOrders(null));
			return result;

		}


	}
	@GetMapping(value = "/get")
	public Product get(@RequestParam("id") int id) {
		return productRepository.findById(id).get();
	}
	@PostMapping(value = "/add")
	public List<Product> persist(@RequestBody final Product product) {
		try{

			User tmp=userRepository.findByAdmin(product.getCreated_user_Id().longValue());
			if(tmp.isAdmin()){
				product.setUpdated_user_Id(-1);
				product.setCreated_user_Id(-1);
				productRepository.save(product);
			}
			List<Product> result=productRepository.findAll();
			result.forEach(f->f.setOrders(null));
			return result ;
		}catch (Exception e){
			List<Product> result=productRepository.findAll();
			result.forEach(f->f.setOrders(null));
			return result ;
		}

	}
	@DeleteMapping(value = "/delete")
	public List<Product> delete(@PathVariable int id) {
		List<Product> result=productRepository.findAll();
		result.forEach(f -> f.setCreated_user_Id(-1));
		result.forEach(f -> f.setUpdated_user_Id(-1));
		result.forEach(f->f.setOrders(null));
		return result ;
	}
	@PutMapping(value = "/put/{id}")
	public List<Product> put(@PathVariable int id, @RequestBody Product product) {
		User tmp=userRepository.findByAdmin(product.getCreated_user_Id().longValue());
		if(tmp.isAdmin()){
			if (productRepository.existsById(id)) {
				productRepository.deleteById(id);
				productRepository.save(product);
			}
		}

		List<Product> result=productRepository.findAll();
		result.forEach(f -> f.setCreated_user_Id(-1));
		result.forEach(f -> f.setUpdated_user_Id(-1));
		result.forEach(f->f.setOrders(null));
		return result ;
	}

	@PostMapping(value = "/edit")
	@Transactional
	public List<Product> edit(@RequestBody final Product product) {
		try{
			User tmp=userRepository.findByAdmin(product.getCreated_user_Id().longValue());
			if(tmp.isAdmin()) {
				productRepository.update(product.getName(), product.getDescription(), product.getCategory(), product.getManufacturer_name(), product.getP_code(), product.getPicture1(), product.getPiece(), product.getPiece(), product.getId());
			}
			List<Product> result=productRepository.findAll();
			result.forEach(f -> f.setCreated_user_Id(-1));
			result.forEach(f -> f.setUpdated_user_Id(-1));
			result.forEach(f->f.setOrders(null));
			return result ;
		}catch(Exception e){
			List<Product> result=productRepository.findAll();
			result.forEach(f->f.setOrders(null));
			return result ;
		}

	}

}
