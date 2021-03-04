package tr.com.obss.finalprojectbackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import tr.com.obss.finalprojectbackend.model.Book;
import tr.com.obss.finalprojectbackend.model.Role;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.repository.BookRepository;
import tr.com.obss.finalprojectbackend.repository.UserRepository;

import java.util.List;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    public Set<Book> addFavBook(long id){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //return principal;

        Book toBeAdded = bookRepository.findById(id);
        Set<User> users = toBeAdded.getFaved_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> favorites= user.getFavorites();
        favorites.add(toBeAdded);
        user.setFavorites(favorites);
        users.add(user);
        toBeAdded.setFaved_users(users);
        bookRepository.save(toBeAdded);
        userRepository.save(user);

        return userRepository.findById(userId).get().getFavorites();
    }

    public Set<Book> removeFavBook(long id){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Book toBeRemoved = bookRepository.findById(id);
        Set<User> users = toBeRemoved.getFaved_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> favorites= user.getFavorites();
        favorites.remove(toBeRemoved);
        user.setFavorites(favorites);
        users.remove(user);
        toBeRemoved.setFaved_users(users);
        bookRepository.save(toBeRemoved);
        userRepository.save(user);

        return userRepository.findById(userId).get().getFavorites();
    }

    public Set<Book> getFavBooks(){

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal==null){
                return null;
            }
            //role = ((Role) ((UserDetails) principal).getAuthorities().stream().toArray()[0]).getRole();
            //role = ((Role)((List)((UserDetails)principal).getAuthorities()).get(0)).getRole();

            long userId = ((User) principal).getId();
            return userRepository.findById(userId).get().getFavorites();

        }catch(Exception ex){
            return null;
        }

    }

    public Set<Book> addReadBook(long id){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        //return principal;

        Book toBeAdded = bookRepository.findById(id);
        Set<User> users = toBeAdded.getRead_list_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> readList= user.getReadList();
        readList.add(toBeAdded);
        user.setReadList(readList);
        users.add(user);
        toBeAdded.setRead_list_users(users);
        bookRepository.save(toBeAdded);
        userRepository.save(user);

        return userRepository.findById(userId).get().getReadList();
    }

    public Set<Book> removeReadBook(long id){
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Book toBeRemoved = bookRepository.findById(id);
        Set<User> users = toBeRemoved.getRead_list_users();

        long userId = ((User)principal).getId();
        User user = userRepository.findById(userId).orElseThrow();
        Set<Book> readList= user.getReadList();
        readList.remove(toBeRemoved);
        user.setReadList(readList);
        users.remove(user);
        toBeRemoved.setRead_list_users(users);
        bookRepository.save(toBeRemoved);
        userRepository.save(user);

        return userRepository.findById(userId).get().getReadList();
    }

    public Set<Book> getReadBooks(){

        try {
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal==null){
                return null;
            }
            //role = ((Role) ((UserDetails) principal).getAuthorities().stream().toArray()[0]).getRole();
            //role = ((Role)((List)((UserDetails)principal).getAuthorities()).get(0)).getRole();

            long userId = ((User) principal).getId();
            return userRepository.findById(userId).get().getReadList();

        }catch(Exception ex){
            return null;
        }

    }
}
