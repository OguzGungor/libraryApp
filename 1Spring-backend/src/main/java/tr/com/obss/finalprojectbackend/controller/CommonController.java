package tr.com.obss.finalprojectbackend.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import tr.com.obss.finalprojectbackend.model.Author;
import tr.com.obss.finalprojectbackend.model.Book;
import tr.com.obss.finalprojectbackend.model.Role;
import tr.com.obss.finalprojectbackend.service.CommonService;

import java.util.List;

@RestController
@RequestMapping("/api/common")
@AllArgsConstructor
public class CommonController {

    private CommonService service;

    @GetMapping("")
    public String getRole(){

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal==null){
                return "unauthorized";
            }
            String role = "null";
            role = ((Role) ((UserDetails) principal).getAuthorities().stream().toArray()[0]).getRole();
            //role = ((Role)((List)((UserDetails)principal).getAuthorities()).get(0)).getRole();

            return role;
            //return ((UserDetails) principal).getUsername();
        }catch(Exception ex){
            return "unauthorized \n" +  ex.getMessage();
        }
        //Set temp = (UserDetails)principal).getAuthorities();
    }

    @GetMapping("/getBooks")
    public List<Book> getBooks(@RequestParam(value = "name",required = false,defaultValue = "non") String name){

        return service.getBooks(name);
    }


    @GetMapping("/getAuthors")
    public List<Author> getAuthors(@RequestParam(value = "name",required = false , defaultValue = "non") String name){

        return service.getAuthors(name);
    }

    @GetMapping("/getBook")
    public Book getBook(@RequestParam(value = "id",required = true) long id){
        return service.getBook(id);
    }
}
