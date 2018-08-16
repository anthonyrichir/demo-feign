package com.mycompany.myapp.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Consumer entity.
 */
public class ConsumerDTO implements Serializable {

    private Long id;

    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ConsumerDTO consumerDTO = (ConsumerDTO) o;
        if (consumerDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), consumerDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ConsumerDTO{" +
            "id=" + getId() +
            ", text='" + getText() + "'" +
            "}";
    }
}
