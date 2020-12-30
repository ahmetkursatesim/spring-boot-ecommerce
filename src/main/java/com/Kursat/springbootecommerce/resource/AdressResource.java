package com.Kursat.springbootecommerce.resource;

import com.Kursat.springbootecommerce.model.Adress;
import com.Kursat.springbootecommerce.model.User;
import com.Kursat.springbootecommerce.repository.AdressRepository;
import com.Kursat.springbootecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/adresses")
@CrossOrigin("*")
public class AdressResource {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdressRepository adressRepository;
    @Transactional
    @PostMapping(value = "/add")
    public User persist(@RequestBody final Adress adress) {
        try{
            User tmp=userRepository.findByIdExists(adress.getUser().getId());
            if(tmp!=null){
                Adress adTmp=adressRepository.findByIdExists(adress.getUser().getId());
                if(adTmp!=null){
                    adressRepository.deleteAdressByUser(adress.getUser().getId());
                }
                adressRepository.save(adress);
                return userRepository.findByIdExists(adress.getUser().getId());
            }else{
                return null;
            }
        }catch(Exception e){
            return null;
        }

    }

}
