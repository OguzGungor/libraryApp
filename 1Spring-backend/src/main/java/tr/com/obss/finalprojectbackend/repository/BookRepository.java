package tr.com.obss.finalprojectbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import tr.com.obss.finalprojectbackend.model.Book;

import java.util.List;

@Repository
public interface BookRepository extends CrudRepository<Book, Long> {
    Book findByName(String name);

    Book findById(long id);



    List<Book> findAll();

    List<Book> findAllByNameContaining(String name);

}
