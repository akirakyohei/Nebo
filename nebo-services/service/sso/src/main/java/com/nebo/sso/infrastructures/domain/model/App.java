package com.nebo.sso.infrastructures.domain.model;

import com.nebo.sso.infrastructures.domain.converter.ListStringConverter;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "apps")
@NoArgsConstructor
@AllArgsConstructor
public class App implements Serializable {
    @Serial
    private static final long serialVersionUID = 1584757465473L;
    private String name;
    @Id
    private String appId;
    private String appSecret;

    @Convert(converter = ListStringConverter.class)
    private List<String> scopes;

    @Column(updatable = false)
    private boolean status;

}
