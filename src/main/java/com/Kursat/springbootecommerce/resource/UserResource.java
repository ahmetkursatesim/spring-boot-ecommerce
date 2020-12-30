package com.Kursat.springbootecommerce.resource;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import com.Kursat.springbootecommerce.model.User;

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
	@PostMapping(value = "/updatephoto")
	@Transactional
	public User updatePhoto(@RequestBody final User user) {
		userRepository.update(user.getPicture(),user.getEmail());
		return userRepository.findByEmail(user.getEmail());

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
