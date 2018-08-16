package com.mycompany.myapp.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Helloer controller
 */
@RestController
@RequestMapping("/api/helloer")
public class HelloerResource {

    private final Logger log = LoggerFactory.getLogger(HelloerResource.class);

    /**
    * GET getHello
    */
    @GetMapping("/get-hello")
    public String getHello() {
        log.warn("REST request to get hello");
        return "getHello";
    }

}
