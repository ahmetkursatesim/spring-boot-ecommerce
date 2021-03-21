package com.Kursat.springbootecommerce.resource;

import java.awt.image.BufferedImage;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import com.Kursat.springbootecommerce.model.Product;
import com.Kursat.springbootecommerce.repository.UserRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.Kursat.springbootecommerce.model.User;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;

/**
 * The Class UserResource.
 *
 * @author Ahmet Kürşat Esim
 * @version 1.0
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserResource {

	@Autowired
	private UserRepository userRepository;

	@GetMapping(value = "/all")
	public List<User> getAll() {
		return userRepository.findAll();
	}

	@GetMapping(value = "/{username}")
	public User get(@PathVariable("username") String username) {

		User tmp=userRepository.findByEmail(username);
		return tmp;
	}

	@PostMapping(value = "/add")
	public User persist(@RequestBody final User user) {
		User tmpUser=user;
		tmpUser.setAdmin(false);
		userRepository.save(tmpUser);
		return userRepository.findByEmail(user.getEmail());
	}

	@DeleteMapping(value = "/delete")
	public List<User> delete(@PathVariable String username) {
		userRepository.deleteById(username);
		return userRepository.findAll();
	}


	@PutMapping(value = "/{username}/put")
	public List<User> put(@PathVariable String username, @RequestBody User user) {

		if (userRepository.existsById(username)) {
			userRepository.deleteById(username);
			user.setAdmin(false);
			userRepository.save(user);
		}
		
		return userRepository.findAll();
	}

	@Value("${app.upload.dir:${user.dir}}")
	public String uploadDir;
	@PostMapping(value = "/updatephoto")
	@Transactional
	public User updatePhoto(@RequestParam("user")  String user, @RequestParam("file") MultipartFile file) {
		Gson gson = new Gson();
		User userTmp = gson.fromJson(user, User.class);
		try {
			UUID randomUUID = UUID.randomUUID();
			InputStream ty = file.getInputStream();
			String abc = convertInputStreamToString(ty);
			String imageData = abc;
			String base64Data = imageData.split(",")[1];
			byte[] decodedBytes = Base64.getDecoder().decode(base64Data);
			ByteArrayInputStream bis = new ByteArrayInputStream(decodedBytes);
			BufferedImage image = ImageIO.read(bis);

			File outputFile = new File(uploadDir + File.separator + "ecommerce-frontend/public/generalfileStorage/" + File.separator + randomUUID + ".png");
			ImageIO.write(image, "png", outputFile);


			userTmp.setPicture("/generalfileStorage/" + randomUUID + ".png");
			userRepository.update(userTmp.getPicture(), userTmp.getEmail());
			return userRepository.findByEmail(userTmp.getEmail());
		}catch (Exception e){

			return userRepository.findByEmail(userTmp.getEmail());
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
	@PostMapping(value = "/isAdmin")
	public Boolean isAdmin(@RequestBody final User user) {
		User tmp=userRepository.findByEmail(user.getEmail());
		if(tmp.isAdmin()){
			return  true;
		}else{
			return false;
		}
	}



}
