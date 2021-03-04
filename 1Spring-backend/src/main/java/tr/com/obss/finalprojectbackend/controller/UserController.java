package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.Book;
import tr.com.obss.finalprojectbackend.service.AdminService;
import tr.com.obss.finalprojectbackend.service.UserService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {

    private UserService service;


    @GetMapping("/test")
    public String testAdmin(){
        return "hello admin";
    }

    @PostMapping("/addFavBook")
    public Set<Book> addFavBook(@RequestBody long id){
        return service.addFavBook(id);
    }


    @GetMapping("/getFavBooks")
    public Set<Book> getFavBooks(){
        return service.getFavBooks();
    }

    @PostMapping("/removeFavBook")
    public Set<Book> removeFavBook(@RequestBody long id){
        return service.removeFavBook(id);
    }


    @PostMapping("/addReadBook")
    public Set<Book> addReadBook(@RequestBody long id){
        return service.addReadBook(id);
    }


    @GetMapping("/getReadBooks")
    public Set<Book> getReadBooks(){
        return service.getReadBooks();
    }

    @PostMapping("/removeReadBook")
    public Set<Book> removeReadBook(@RequestBody long id){
        return service.removeReadBook(id);
    }

    @GetMapping
    public String testUser(){
        return "hello user";
    }



}
