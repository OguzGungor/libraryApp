package tr.com.obss.finalprojectbackend.service;


import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tr.com.obss.finalprojectbackend.model.Author;
import tr.com.obss.finalprojectbackend.model.Book;
import tr.com.obss.finalprojectbackend.model.Role;
import tr.com.obss.finalprojectbackend.model.User;
import tr.com.obss.finalprojectbackend.repository.AuthorRepository;
import tr.com.obss.finalprojectbackend.repository.BookRepository;
import tr.com.obss.finalprojectbackend.repository.RoleRepository;
import tr.com.obss.finalprojectbackend.repository.UserRepository;

import java.util.*;

@AllArgsConstructor
@Service
public class AdminService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AuthorRepository authorRepository;

    @Bean
    CommandLineRunner commandLineRunner() {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
                BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
                String hashedPassword = bCryptPasswordEncoder.encode("123");
                HashSet<Role> roles = new HashSet<>();
                Role temp = new Role();
                temp.setRole("user");
                roleRepository.save(temp);
                roles.add(temp);

                User user = new User();
                user.setEncryptedPassword(hashedPassword);
                user.setUsername("user");
                user.setRoles(roles);
                //Users user = new Users(1l, "username", hashedPassword, roles);
                userRepository.save(user);

                hashedPassword = bCryptPasswordEncoder.encode("456");
                roles = new HashSet<>();
                temp = new Role();
                temp.setRole("admin");
                roleRepository.save(temp);
                roles.add(temp);

                user = new User();
                user.setEncryptedPassword(hashedPassword);
                user.setUsername("admin");
                user.setRoles(roles);
                //Users user = new Users(1l, "username", hashedPassword, roles);
                userRepository.save(user);

            }
        };
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Optional<User> byUsername = userRepository.findByUsername(username);

        return byUsername.orElseThrow(() -> new UsernameNotFoundException("Kullanıcı Bulunamadı"));

    }

    public User addUser(User user){
        //return user;
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        user.setEncryptedPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        Set<Role> temp = new HashSet<>();
        for (Role r : user.getRoles()) {
            temp.add(roleRepository.findByRole(r.getAuthority()).orElseThrow());
        }
        user.setRoles(temp);
        if(user.getId()!= null) {
            if (userRepository.findById(user.getId()).get() != null) {
                User tempUser = userRepository.findById(user.getId()).get();
                user.setReadList(tempUser.getReadList());
                user.setFavorites(tempUser.getFavorites());
                user.setImage(tempUser.getImage());
            }
        }

        return userRepository.save(user);
    }

    public Book addBook(Book book){
       Set<Author> temp2 = new HashSet<>();
       Set<Author> temp3 = new HashSet<>();
        for (Author author: book.getAuthors()) {
            if(authorRepository.findByName(author.getName())==null){
                Set<Book> temp = new HashSet<>();
                temp.add(book);
                author.setBooks(temp);
                authorRepository.save(author);
            }
            else{
                temp3.add(author);
                author.setId(authorRepository.findByName(author.getName()).getId());
                temp2.add(author);
            }

        }
        Set<Author> temp = book.getAuthors();
        for (Author author:temp3) {
            temp.remove(author);
        }
        for (Author  author : temp2) {
            temp.add(author);
        }

        book.setAuthors(temp);
        if(bookRepository.findById((book.getId()))!= null){
            Book tempBook = bookRepository.findById(book.getId());
            book.setRead_list_users(tempBook.getRead_list_users());
            book.setFaved_users(tempBook.getFaved_users());
            book.setImage(tempBook.getImage());
        }

        return bookRepository.save(book);

    }

    public Author addAuthor(Author author){

        //to avoid transiency inside the loop, values of books should be saved just before when author is saved
        List<Book> temp2 = new ArrayList<>();

        //saved values to avoid concurrency inside the loop, will be iterated after first loop
        List<Book> toBeRemoved = new ArrayList<>();
        List<Book> toBeAdded = new ArrayList<>();

        //get current book list of author if author is already created
        Set<Book> currentList = null;
        if(authorRepository.findByName((author.getName()))!= null) {
            currentList = authorRepository.findByName(author.getName()).getBooks();
        }

        //loop to update books of authors
        for (Book book: author.getBooks()) {
            if(bookRepository.findByName(book.getName())==null){
                Set<Author> temp = new HashSet<>();
                temp.add(author);
                book.setAuthors(temp);
                temp2.add(book);
            }
            else{
                toBeRemoved.add(book);
                book.setId(bookRepository.findByName(book.getName()).getId());
                toBeAdded.add(book);
            }
        }
        Set<Book> temp = author.getBooks();
        for (Book book: toBeRemoved) {
            temp.remove(book);
        }
        for (Book book: toBeAdded) {
            temp.add(book);
        }
        if(currentList != null) {
            for (Book book : currentList) {
                temp.add(book);
            }
        }
        author.setBooks((temp));

        //get elements of existing entity before save
        if(authorRepository.findByName((author.getName()))!= null){
            author.setId(authorRepository.findByName(author.getName()).getId());
        }
        authorRepository.save(author);

        //books to be created
        for (Book book: temp2) {
            bookRepository.save(book);
        }

        return authorRepository.save(author);
    }

    public List<User> getUsers(String name){
        if(name.equals("non")){
            return userRepository.findAll();
        }else{
            return userRepository.findAllByUsernameContaining(name);
        }

    }

    public String removeBook(long id){
        Book toBeRemoved = bookRepository.findById(id);
        Set<Author> authors = toBeRemoved.getAuthors();
        Set<User> favUsers = toBeRemoved.getFaved_users();
        Set<User> readUser = toBeRemoved.getRead_list_users();
        for(User user : favUsers){
            User temp = userRepository.findById(user.getId()).get();
            Set<Book> favlist = temp.getFavorites();
            favlist.remove(toBeRemoved);
            temp.setFavorites(favlist);
            userRepository.save(user);
        }
        for(User user : favUsers){
            User temp = userRepository.findById(user.getId()).get();
            Set<Book> readlist = temp.getReadList();
            readlist.remove(toBeRemoved);
            temp.setReadList(readlist);
            userRepository.save(user);
        }
        bookRepository.deleteById(id);
        for (Author author: authors) {
            if(authorRepository.findById(author.getId()).getBooks().size() == 0){
                authorRepository.deleteById(author.getId());
            }
        }
        return "done " + id ;
    }

    public String removeUser(long id){
        try {
            userRepository.deleteById(id);
            return "done";
        }catch(Exception ex){
            return "not done";
        }
    }

    public User getUser(long id){
        return userRepository.findById(id).get();
    }






}

