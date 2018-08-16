package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Consumer;
import com.mycompany.myapp.repository.ConsumerRepository;
import com.mycompany.myapp.service.dto.ConsumerDTO;
import com.mycompany.myapp.service.mapper.ConsumerMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Consumer.
 */
@Service
@Transactional
public class ConsumerService {

    private final Logger log = LoggerFactory.getLogger(ConsumerService.class);

    private final ConsumerRepository consumerRepository;

    private final ConsumerMapper consumerMapper;

    private final ProducerClient producerClient;

    public ConsumerService(ConsumerRepository consumerRepository, ConsumerMapper consumerMapper, ProducerClient producerClient) {
        this.consumerRepository = consumerRepository;
        this.consumerMapper = consumerMapper;
        this.producerClient = producerClient;
    }

    /**
     * Save a consumer.
     *
     * @param consumerDTO the entity to save
     * @return the persisted entity
     */
    public ConsumerDTO save(ConsumerDTO consumerDTO) {
        log.debug("Request to save Consumer : {}", consumerDTO);
        Consumer consumer = consumerMapper.toEntity(consumerDTO);
        consumer.setText(consumer.getText() + producerClient.getHello());
        consumer = consumerRepository.save(consumer);
        return consumerMapper.toDto(consumer);
    }

    /**
     * Get all the consumers.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ConsumerDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Consumers");
        return consumerRepository.findAll(pageable)
            .map(consumerMapper::toDto);
    }


    /**
     * Get one consumer by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ConsumerDTO> findOne(Long id) {
        log.debug("Request to get Consumer : {}", id);
        return consumerRepository.findById(id)
            .map(consumerMapper::toDto);
    }

    /**
     * Delete the consumer by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Consumer : {}", id);
        consumerRepository.deleteById(id);
    }
}
