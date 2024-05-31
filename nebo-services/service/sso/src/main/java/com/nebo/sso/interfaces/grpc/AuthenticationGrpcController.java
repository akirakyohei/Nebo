package com.nebo.sso.interfaces.grpc;


import com.nebo.grpc.lib.*;
import com.nebo.sso.applications.services.AppService;
import com.nebo.sso.applications.services.AuthenticateProvider;
import com.nebo.sso.applications.services.BlackListService;
import com.nebo.web.applications.exception.AuthenticationException;
import com.nebo.web.applications.utils.JsonUtils;
import io.grpc.stub.StreamObserver;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.devh.boot.grpc.server.service.GrpcService;


@Slf4j
@GrpcService
@RequiredArgsConstructor
public class AuthenticationGrpcController extends AuthenticationServiceGrpc.AuthenticationServiceImplBase {

    private final BlackListService blackListService;

    private final AppService appService;

    @Override
    public void isBlackListToken(AuthenticationRequest request, StreamObserver<BlackListResultResponse> responseObserver) {
        var result = blackListService.isBlackList(request.getUserId(), request.getToken());
        responseObserver.onNext(BlackListResultResponse.newBuilder().setBlock(result).build());
        responseObserver.onCompleted();
    }

    @Override
    public void authenticateAppClient(AppClientAuthenticationRequest request, StreamObserver<AppClientAuthenticationResponse> responseObserver) {
        try {
            var app = appService.getApiKeyByAccessToken(request.getApiKey());
            responseObserver.onNext(AppClientAuthenticationResponse.newBuilder()
                    .setId(app.getId())
                    .setUserId(app.getUserId())
                    .setName(app.getName())
                    .addAllScopes(app.getScopes())
                    .build());
        } catch (Exception exception) {
            responseObserver.onError(new AuthenticationException());
        }
        responseObserver.onCompleted();
    }
}
