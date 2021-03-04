package tr.com.obss.finalprojectbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class FinalProjectBackendApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(FinalProjectBackendApplication.class, args);
    }

}
