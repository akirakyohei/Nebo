package com.nebo.sso.interfaces.grpc;


import com.nebo.grpc.lib.AuthenticationRequest;
import com.nebo.grpc.lib.AuthenticationServiceGrpc;
import com.nebo.grpc.lib.BlackListResultResponse;
import com.nebo.sso.applications.services.AuthenticateProvider;
import com.nebo.sso.applications.services.BlackListService;
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

    @Override
    public void isBlackListToken(AuthenticationRequest request, StreamObserver<BlackListResultResponse> responseObserver) {
        var result = blackListService.isBlackList(request.getUserId(), request.getToken());
        responseObserver.onNext(BlackListResultResponse.newBuilder().setBlock(result).build());
        responseObserver.onCompleted();
    }
}
