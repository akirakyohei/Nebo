package com.nebo.lib.feignclient.client.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
public class User {
    private long id;
    private String firstName;
    private String lastName;
    private String imageUrl;
    private String email;
    private String phoneNumber;
    private List<String> permissions;
    private String provider;
    private String providerId;
}
