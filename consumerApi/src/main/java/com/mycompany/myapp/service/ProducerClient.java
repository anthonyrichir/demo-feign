package com.mycompany.myapp.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * @author Anthony Richir
 */
@FeignClient(name = "producerapi")
@RequestMapping("/api/helloer")
public interface ProducerClient {

    @RequestMapping(method = RequestMethod.GET, value = "/get-hello")
    String getHello();

}
