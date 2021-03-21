package com.Kursat.springbootecommerce.resource;


import com.Kursat.springbootecommerce.Enums.Order_Status;
import com.Kursat.springbootecommerce.ExModel.OrderMasterEx;
import com.Kursat.springbootecommerce.ExModel.ProductEx;
import com.Kursat.springbootecommerce.model.OrderMaster;
import com.Kursat.springbootecommerce.model.Product;
import com.Kursat.springbootecommerce.model.User;
import com.Kursat.springbootecommerce.repository.OrderMasterRepository;
import com.Kursat.springbootecommerce.repository.ProductRepository;
import com.Kursat.springbootecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/ordermaster")
@CrossOrigin("*")
public class OrderMasterResource {
    @Autowired
    private OrderMasterRepository orderRepository;
    @Autowired
    private UserRepository userRepository;

    @GetMapping(value = "/all/{id}")
    public List<OrderMasterEx> getAll(@PathVariable String id) {
        User tmp=userRepository.findByAdmin(Long.valueOf(id));
        try{
            if(tmp!=null){
                if(tmp.isAdmin()){
                    List<OrderMaster> result=orderRepository.findAll();
                    return getConvertOrderMaster(result);
                }else{
                    List<OrderMaster> result=orderRepository.findByUser_id(Integer.valueOf(id));

                    return  getConvertOrderMaster(result);
                }

            }else{
                User tmp2=userRepository.findByIdExists(Integer.valueOf(id));
                if(tmp2!=null){
                    List<OrderMaster> result=orderRepository.findByUser_id(Integer.valueOf(id));
                    return  getConvertOrderMaster(result);
                }else{
                    return null;
                }

            }

        } catch (Exception w){
            return null;
        }

    }
    @PostMapping(value = "/add")
    public List<OrderMasterEx> persist(@RequestBody final OrderMasterEx orderMasterEx) {
        try{
            User tmp=userRepository.findByIdExists(orderMasterEx.getUser_id().longValue());
            if(tmp!=null){
                orderRepository.save(getConvertOrderMasterEx(orderMasterEx));
            }
            List<OrderMaster> result=orderRepository.findByUser_id(orderMasterEx.getUser_id());
            return getConvertOrderMaster(result);
        }catch (Exception e){
            return null ;
        }
    }

    public OrderMaster getConvertOrderMasterEx(OrderMasterEx orderMasterEx){
        OrderMaster model=new OrderMaster();
        model.setOrder_status(orderMasterEx.getOrder_status());
        model.setUser_id(orderMasterEx.getUser_id());
        model.setCreated_at(orderMasterEx.getCreated_at());
        ArrayList<Product> model2 = new ArrayList<Product>();
        for(ProductEx ex : orderMasterEx.getProductsMasters()){
            for(int i=0;i<ex.getOrderQuantity();i++){
                Product a=  new Product(ex.getId(),ex.getName(),ex.getDescription(),ex.getPiece(),ex.getPrice(),ex.getPicture1(),ex.getP_code(),ex.getManufacturer_name(),ex.getCreated_user_Id(), ex.getUpdated_user_Id(),ex.getCategory(),null);
                model2.add(a);

            }
        }
        model.setProductsMasters(model2);
        return model;
    }

    public List<OrderMasterEx> getConvertOrderMaster(List<OrderMaster> result){
        ArrayList<OrderMasterEx> result2=new ArrayList<OrderMasterEx>();


        for (OrderMaster mas : result){
            OrderMasterEx model=new OrderMasterEx();
            model.setUser_id(mas.getUser_id());
            model.setOrder_id(mas.getOrder_id());
            model.setOrder_status(mas.getOrder_status());
            model.setCreated_at(mas.getCreated_at());
            ArrayList<ProductEx> model2 = new ArrayList<ProductEx>();
            for(Product pro:mas.getProductsMasters()){
                if(!getExist(pro.getId(),model2)){
                    model2.add(new ProductEx(pro.getId(),pro.getName(),pro.getDescription(),pro.getPiece(),pro.getPrice(),pro.getPicture1(),pro.getP_code(),pro.getManufacturer_name(),pro.getCreated_user_Id(),pro.getUpdated_user_Id(),pro.getCategory(),1));
                }else {
                    int index=getIndex(pro.getId(),model2);
                    if(index!=-1){
                        ProductEx pross= model2.get(index);
                        pross.setOrderQuantity(pross.getOrderQuantity()+1);
                        model2.set(index,pross);
                    }
                }
            }
            model.setProductsMasters(model2);
            result2.add(model);

        }
        return result2;

    }
    int getIndex(Integer orderId,List<ProductEx> array){
        for(int i = 0; i<array.size(); i++){
            if(array.get(i).getId().equals(orderId)){
                return i;
            }
        }
        return -1;
    }

    Boolean getExist(Integer orderId,List<ProductEx> array){
        if(array !=null){

            for(int i = 0; i<array.size(); i++){
                if(array.get(i).getId().equals(orderId)){
                    return true;
                }
            }
        }

        return false;
    }
    @PostMapping(value = "/updateorderstatus/{order_id}/{status}/{user_id}")
    @Transactional
    public List<OrderMasterEx> updateOrderstatus(@PathVariable("order_id") String order_id, @PathVariable("status")  String status,@PathVariable("user_id")  String user_id) {
        try{
            User tmp=userRepository.findByAdmin(Long.valueOf(user_id));
            if(tmp!=null){
                orderRepository.updateStatus(Order_Status.valueOf(status),Integer.valueOf(order_id));
                List<OrderMaster> result=orderRepository.findAll();
                return getConvertOrderMaster(result);
            }
            return null;

        }catch (Exception e){
             return null;
        }


    }




}
