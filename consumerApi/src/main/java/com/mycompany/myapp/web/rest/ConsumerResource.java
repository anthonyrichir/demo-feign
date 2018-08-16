package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.service.ConsumerService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import com.mycompany.myapp.web.rest.util.PaginationUtil;
import com.mycompany.myapp.service.dto.ConsumerDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Consumer.
 */
@RestController
@RequestMapping("/api")
public class ConsumerResource {

    private final Logger log = LoggerFactory.getLogger(ConsumerResource.class);

    private static final String ENTITY_NAME = "consumer";

    private final ConsumerService consumerService;

    public ConsumerResource(ConsumerService consumerService) {
        this.consumerService = consumerService;
    }

    /**
     * POST  /consumers : Create a new consumer.
     *
     * @param consumerDTO the consumerDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consumerDTO, or with status 400 (Bad Request) if the consumer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consumers")
    @Timed
    public ResponseEntity<ConsumerDTO> createConsumer(@RequestBody ConsumerDTO consumerDTO) throws URISyntaxException {
        log.debug("REST request to save Consumer : {}", consumerDTO);
        if (consumerDTO.getId() != null) {
            throw new BadRequestAlertException("A new consumer cannot already have an ID", ENTITY_NAME, "idexists");
        }        
        ConsumerDTO result = consumerService.save(consumerDTO);
        return ResponseEntity.created(new URI("/api/consumers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consumers : Updates an existing consumer.
     *
     * @param consumerDTO the consumerDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consumerDTO,
     * or with status 400 (Bad Request) if the consumerDTO is not valid,
     * or with status 500 (Internal Server Error) if the consumerDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consumers")
    @Timed
    public ResponseEntity<ConsumerDTO> updateConsumer(@RequestBody ConsumerDTO consumerDTO) throws URISyntaxException {
        log.debug("REST request to update Consumer : {}", consumerDTO);
        if (consumerDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }        
        ConsumerDTO result = consumerService.save(consumerDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consumerDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consumers : get all the consumers.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of consumers in body
     */
    @GetMapping("/consumers")
    @Timed
    public ResponseEntity<List<ConsumerDTO>> getAllConsumers(Pageable pageable) {
        log.debug("REST request to get a page of Consumers");
        Page<ConsumerDTO> page = consumerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/consumers");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /consumers/:id : get the "id" consumer.
     *
     * @param id the id of the consumerDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consumerDTO, or with status 404 (Not Found)
     */
    @GetMapping("/consumers/{id}")
    @Timed
    public ResponseEntity<ConsumerDTO> getConsumer(@PathVariable Long id) {
        log.debug("REST request to get Consumer : {}", id);
        Optional<ConsumerDTO> consumerDTO = consumerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(consumerDTO);
    }

    /**
     * DELETE  /consumers/:id : delete the "id" consumer.
     *
     * @param id the id of the consumerDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consumers/{id}")
    @Timed
    public ResponseEntity<Void> deleteConsumer(@PathVariable Long id) {
        log.debug("REST request to delete Consumer : {}", id);
        consumerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
