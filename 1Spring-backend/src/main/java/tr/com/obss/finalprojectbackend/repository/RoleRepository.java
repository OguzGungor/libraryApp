package tr.com.obss.finalprojectbackend.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tr.com.obss.finalprojectbackend.model.Role;

import java.util.Optional;

@Repository
public interface RoleRepository extends CrudRepository<Role, String> {

    Optional<Role> findByRole(@Param("role") String role);
}

