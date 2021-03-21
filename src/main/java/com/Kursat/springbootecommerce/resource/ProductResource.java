package com.Kursat.springbootecommerce.resource;

import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

import com.Kursat.springbootecommerce.model.Product;
import com.Kursat.springbootecommerce.model.User;
import com.Kursat.springbootecommerce.repository.ProductRepository;
import com.Kursat.springbootecommerce.repository.UserRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;

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
	@GetMapping(value = "/getFilteredList/{par1}")
	public  List<Product> getFilteredList(@PathVariable String par1) {

		String[] tmp= par1.split("&");
		List<Product> result=productRepository.findAll();
        if(tmp.length>0){
			if(tmp.length<=1){
				 result=result.stream().filter(product -> product.getCategory().getName().contains(tmp[0])).collect(Collectors.toList());
			}else{
				 String[] tmp2=tmp[1].split("-");
				 if(tmp2.length>=2){
					 result=result.stream().filter(product -> product.getCategory().getName().contains(tmp[0]) && (product.getName().toLowerCase(Locale.ENGLISH).contains(tmp2[1].toLowerCase(Locale.ENGLISH)) || product.getName().toLowerCase(Locale.ENGLISH).contains(tmp2[0].toLowerCase(Locale.ENGLISH)) )).collect(Collectors.toList());

				 }else{
					 result=result.stream().filter(product -> product.getCategory().getName().contains(tmp[0]) && (product.getName().toLowerCase(Locale.ENGLISH).contains(tmp2[0].toLowerCase(Locale.ENGLISH)) )).collect(Collectors.toList());

				 }
		}

		}
		result.forEach(f->f.setOrders(null));
		return result;



	}
	@GetMapping(value = "/getFilteredSearchList/{par1}")
	public  List<Product> getFilteredSearchList(@PathVariable String par1) {

		String[] tmp= par1.split("&");
		List<Product> result=productRepository.findAll();
		if(tmp.length>0){
			if(tmp.length<=1){
				result=result.stream().filter(product -> product.getName().toLowerCase(Locale.ROOT).contains(tmp[0].toLowerCase(Locale.ROOT))).collect(Collectors.toList());
			}else{
				result=result.stream().filter(product -> product.getName().toLowerCase(Locale.ROOT).contains(tmp[0].toLowerCase(Locale.ROOT)) || product.getCategory().getId().equals(tmp[1])   ).collect(Collectors.toList());
			}
			result.forEach(f->f.setOrders(null));
			return result;
		}else{
			return null;
		}
	}


	@GetMapping(value = "/get/{id}")
	public Product get(@PathVariable String id) {

		Product result=productRepository.findById(Integer.valueOf(id)).get();
		result.setOrders(null);
		return  result;
	}
	@Value("${app.upload.dir:${user.dir}}")
	public String uploadDir;
	@PostMapping(value = "/add")
	public List<Product> persist(@RequestParam("product")  String product, @RequestParam("file") MultipartFile file) {
		try{
			UUID randomUUID=UUID.randomUUID();
			InputStream ty=file.getInputStream();
			String abc=convertInputStreamToString(ty);
			String imageData = abc;
			String base64Data = imageData.split(",")[1];
			byte[] decodedBytes = Base64.getDecoder().decode(base64Data);
			ByteArrayInputStream bis = new ByteArrayInputStream(decodedBytes);
			BufferedImage image = ImageIO.read(bis);

			File outputFile = new File(uploadDir + File.separator +"ecommerce-frontend/public/generalfileStorage/"+File.separator+ randomUUID +".png");
			ImageIO.write(image, "png", outputFile);

		Gson gson = new Gson();
		Product productTmp=gson.fromJson(product,Product.class);
		productTmp.setPicture1("/generalfileStorage/"+randomUUID +".png");

		User tmp=userRepository.findByAdmin(productTmp.getCreated_user_Id().longValue());
			if(tmp.isAdmin()){
				productTmp.setUpdated_user_Id(-1);
				productTmp.setCreated_user_Id(-1);
				productRepository.save(productTmp);
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

	private static String convertInputStreamToString(InputStream inputStream)
			throws IOException {

		ByteArrayOutputStream result = new ByteArrayOutputStream();
		byte[] buffer = new byte[1024];
		int length;
		while ((length = inputStream.read(buffer)) != -1) {
			result.write(buffer, 0, length);
		}

		return result.toString(StandardCharsets.UTF_8.name());

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

	@Value("${app.upload.dir:${user.dir}}")
	public String uploadDir2;
	@PostMapping(value = "/edit")
	@Transactional
	public List<Product> edit(@RequestParam("product") String product, @RequestParam("file") MultipartFile file) {
		try{
			UUID randomUUID=UUID.randomUUID();
			InputStream ty=file.getInputStream();
			String abc=convertInputStreamToString(ty);
			String imageData = abc;
			String base64Data = imageData.split(",")[1];
			byte[] decodedBytes = Base64.getDecoder().decode(base64Data);
			ByteArrayInputStream bis = new ByteArrayInputStream(decodedBytes);
			BufferedImage image = ImageIO.read(bis);

			File outputFile = new File(uploadDir2 + File.separator +"ecommerce-frontend/public/generalfileStorage/"+File.separator+ randomUUID +".png");
			ImageIO.write(image, "png", outputFile);

			Gson gson = new Gson();
			Product productTmp=gson.fromJson(product,Product.class);
			productTmp.setPicture1("/generalfileStorage/"+randomUUID +".png");
			User tmp=userRepository.findByAdmin(productTmp.getCreated_user_Id().longValue());
			if(tmp.isAdmin()) {
				productRepository.update(productTmp.getName(), productTmp.getDescription(), productTmp.getCategory(), productTmp.getManufacturer_name(), productTmp.getP_code(), productTmp.getPicture1(), productTmp.getPiece(), productTmp.getPiece(), productTmp.getId());
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
