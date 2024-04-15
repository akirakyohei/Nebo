package com.nebo.sso.interfaces.grpc;

import com.nebo.grpc.lib.AuthenticationRequest;
import com.nebo.grpc.lib.AuthenticationServiceGrpc;
import com.nebo.grpc.lib.UserResponse;
import com.nebo.sso.applications.services.AuthenticateProvider;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import net.devh.boot.grpc.server.service.GrpcService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@GrpcService
@RequiredArgsConstructor
public class AuthenticationGrpcController extends AuthenticationServiceGrpc.AuthenticationServiceImplBase {
    private final AuthenticateProvider authenticateProvider;

    @Override
    public void authenticate(AuthenticationRequest request, StreamObserver<UserResponse> responseObserver) {
        if (authenticateProvider.validateJwtToken(request.getToken())) ;
        responseObserver.onNext(au);
    }
}
