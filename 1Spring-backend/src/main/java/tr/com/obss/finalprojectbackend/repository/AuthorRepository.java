package tr.com.obss.finalprojectbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.finalprojectbackend.model.Author;
import tr.com.obss.finalprojectbackend.model.Book;

import java.util.List;

@Repository
public interface AuthorRepository extends CrudRepository<Author, Long> {


    Author findById(long id);
    Author findByName(String name);
    List<Author> findAll();

    List<Author> findAllByNameContaining(String name);
}
