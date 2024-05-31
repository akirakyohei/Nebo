package com.nebo.sso.applications.services;

import com.nebo.sso.applications.model.UserCreateRequest;
import com.nebo.sso.applications.model.UserResponse;
import com.nebo.sso.infrastructures.domain.model.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-05-31T00:10:29+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.6 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toUser(UserCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        User user = new User();

        user.setFirstName( request.getFirstName() );
        user.setLastName( request.getLastName() );
        user.setEmail( request.getEmail() );
        user.setPhoneNumber( request.getPhoneNumber() );
        user.setPassword( request.getPassword() );

        return user;
    }

    @Override
    public UserResponse fromDomainToResponse(User user) {
        if ( user == null ) {
            return null;
        }

        UserResponse userResponse = new UserResponse();

        if ( user.getId() != null ) {
            userResponse.setId( user.getId() );
        }
        userResponse.setFirstName( user.getFirstName() );
        userResponse.setLastName( user.getLastName() );
        userResponse.setEmail( user.getEmail() );
        userResponse.setPhoneNumber( user.getPhoneNumber() );
        List<String> list = user.getPermissions();
        if ( list != null ) {
            userResponse.setPermissions( new ArrayList<String>( list ) );
        }
        userResponse.setProvider( user.getProvider() );
        userResponse.setProviderId( user.getProviderId() );

        return userResponse;
    }
}
