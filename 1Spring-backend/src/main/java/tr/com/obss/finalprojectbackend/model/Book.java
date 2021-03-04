package tr.com.obss.finalprojectbackend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String image;

    private String name;

    @ManyToMany(mappedBy = "favorites")
    @JsonIgnoreProperties({"favorites","readList"})
    private Set<User> faved_users;

    @ManyToMany(mappedBy = "readList")
    @JsonIgnoreProperties({"favorites","readList"})
    private Set<User> read_list_users;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "Authors_Books",
            joinColumns = {@JoinColumn(name = "BOOK_ID", referencedColumnName = "ID")},
            inverseJoinColumns = {@JoinColumn(name = "AUTHOR_ID", referencedColumnName = "ID")})
    @JsonIgnoreProperties("books")
    private Set<Author> authors;

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setFaved_users(Set<User> faved_users) {
        this.faved_users = faved_users;
    }

    public Set<User> getFaved_users() {
        return faved_users;
    }

    public void setRead_list_users(Set<User> read_list_users) {
        this.read_list_users = read_list_users;
    }

    public Set<User> getRead_list_users() {
        return read_list_users;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImage() {
        return image;
    }
}
