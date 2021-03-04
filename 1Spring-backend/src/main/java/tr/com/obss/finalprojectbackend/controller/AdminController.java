package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.Author;
import tr.com.obss.finalprojectbackend.model.Book;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@AllArgsConstructor
public class AdminController {

    private AdminService service;

    
    @PostMapping
    public String testRole(){
        /*Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username = "null";
        if (principal instanceof UserDetails) {
            username = ((UserDetails)principal).getUsername();
        } else {
            username = principal.toString();
        }
        String roles = "";
        //Set temp = (UserDetails)principal).getAuthorities();*/


        return "hi ";
    }

    @GetMapping
    public String testAdmin(){
        return "hello admin";
    }
    //adding user to system
    @PostMapping("/addUser")
    public String addUser( @RequestBody User user){
        //System.out.println("test");
        //return user.getUsername();
        return service.addUser(user).getUsername();
    }
    //adding book to system
    @PostMapping("/addBook")
    public Book addBook( @RequestBody Book book){
        return service.addBook(book);
    }

    @PostMapping("/addAuthor")
    public Author addAuthor( @RequestBody Author author){
        return service.addAuthor(author);
    }

    //get all the users of the system
    @GetMapping("/getUsers")
    public List<User> getUsers(@RequestParam(value = "name", required = false, defaultValue = "non") String name){
        return service.getUsers(name);
    }

    //remove book that has id specified as parameter
    @PostMapping("/removeBook")
    public String removeBook(@RequestBody long id){
        return service.removeBook(id);
    }
    //remove user that has id specified as parameter
    @PostMapping("/removeUser")
    public String removeUser(@RequestBody long id){
        return service.removeUser(id);
    }
    //get user that has id specified as parameter
    @GetMapping("/getUser")
    public User getUser(@RequestParam(value = "id",required = true) long id){
        return service.getUser(id);
    }


}
