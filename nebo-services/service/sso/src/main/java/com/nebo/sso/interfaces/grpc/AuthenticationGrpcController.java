package com.nebo.sso.interfaces.grpc;

import com.google.protobuf.InvalidProtocolBufferException;
import com.google.protobuf.util.JsonFormat;
import com.nebo.grpc.lib.AuthenticationRequest;
import com.nebo.grpc.lib.AuthenticationServiceGrpc;
import com.nebo.grpc.lib.UserCredentialResponse;
import com.nebo.sso.applications.services.AuthenticateProvider;
import com.nebo.web.applications.utils.JsonUtils;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;


@Slf4j
@GrpcService
@RequiredArgsConstructor
public class AuthenticationGrpcController extends AuthenticationServiceGrpc.AuthenticationServiceImplBase {
    private final AuthenticateProvider authenticateProvider;

    @Override
    public void authenticate(AuthenticationRequest request, StreamObserver<UserCredentialResponse> responseObserver) {
        if (authenticateProvider.validateJwtToken(request.getToken())) {
            var response = authenticateProvider.getUserCredential(request.getToken());
            var builder = UserCredentialResponse.newBuilder();
            try {
                JsonFormat.parser().ignoringUnknownFields().merge(JsonUtils.unmarshall(response), builder);
            } catch (InvalidProtocolBufferException e) {
                log.error("[authenticate] erro", e);
            }
            responseObserver.onNext(builder.build());
        }
    }
}
