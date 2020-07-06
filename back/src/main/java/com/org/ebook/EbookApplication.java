package com.org.ebook;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
//        (exclude = MongoAutoConfiguration.class)
public class EbookApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbookApplication.class, args);
    }

}
