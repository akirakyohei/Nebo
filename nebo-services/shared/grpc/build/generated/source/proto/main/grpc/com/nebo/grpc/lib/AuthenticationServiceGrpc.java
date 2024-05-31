package com.nebo.grpc.lib;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.59.1)",
    comments = "Source: security.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class AuthenticationServiceGrpc {

  private AuthenticationServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "com.nebo.grpc.security.AuthenticationService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.nebo.grpc.lib.AuthenticationRequest,
      com.nebo.grpc.lib.BlackListResultResponse> getIsBlackListTokenMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "isBlackListToken",
      requestType = com.nebo.grpc.lib.AuthenticationRequest.class,
      responseType = com.nebo.grpc.lib.BlackListResultResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.nebo.grpc.lib.AuthenticationRequest,
      com.nebo.grpc.lib.BlackListResultResponse> getIsBlackListTokenMethod() {
    io.grpc.MethodDescriptor<com.nebo.grpc.lib.AuthenticationRequest, com.nebo.grpc.lib.BlackListResultResponse> getIsBlackListTokenMethod;
    if ((getIsBlackListTokenMethod = AuthenticationServiceGrpc.getIsBlackListTokenMethod) == null) {
      synchronized (AuthenticationServiceGrpc.class) {
        if ((getIsBlackListTokenMethod = AuthenticationServiceGrpc.getIsBlackListTokenMethod) == null) {
          AuthenticationServiceGrpc.getIsBlackListTokenMethod = getIsBlackListTokenMethod =
              io.grpc.MethodDescriptor.<com.nebo.grpc.lib.AuthenticationRequest, com.nebo.grpc.lib.BlackListResultResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "isBlackListToken"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.nebo.grpc.lib.AuthenticationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.nebo.grpc.lib.BlackListResultResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthenticationServiceMethodDescriptorSupplier("isBlackListToken"))
              .build();
        }
      }
    }
    return getIsBlackListTokenMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.nebo.grpc.lib.AppClientAuthenticationRequest,
      com.nebo.grpc.lib.AppClientAuthenticationResponse> getAuthenticateAppClientMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "authenticateAppClient",
      requestType = com.nebo.grpc.lib.AppClientAuthenticationRequest.class,
      responseType = com.nebo.grpc.lib.AppClientAuthenticationResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.nebo.grpc.lib.AppClientAuthenticationRequest,
      com.nebo.grpc.lib.AppClientAuthenticationResponse> getAuthenticateAppClientMethod() {
    io.grpc.MethodDescriptor<com.nebo.grpc.lib.AppClientAuthenticationRequest, com.nebo.grpc.lib.AppClientAuthenticationResponse> getAuthenticateAppClientMethod;
    if ((getAuthenticateAppClientMethod = AuthenticationServiceGrpc.getAuthenticateAppClientMethod) == null) {
      synchronized (AuthenticationServiceGrpc.class) {
        if ((getAuthenticateAppClientMethod = AuthenticationServiceGrpc.getAuthenticateAppClientMethod) == null) {
          AuthenticationServiceGrpc.getAuthenticateAppClientMethod = getAuthenticateAppClientMethod =
              io.grpc.MethodDescriptor.<com.nebo.grpc.lib.AppClientAuthenticationRequest, com.nebo.grpc.lib.AppClientAuthenticationResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "authenticateAppClient"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.nebo.grpc.lib.AppClientAuthenticationRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.nebo.grpc.lib.AppClientAuthenticationResponse.getDefaultInstance()))
              .setSchemaDescriptor(new AuthenticationServiceMethodDescriptorSupplier("authenticateAppClient"))
              .build();
        }
      }
    }
    return getAuthenticateAppClientMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static AuthenticationServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AuthenticationServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AuthenticationServiceStub>() {
        @java.lang.Override
        public AuthenticationServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AuthenticationServiceStub(channel, callOptions);
        }
      };
    return AuthenticationServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static AuthenticationServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AuthenticationServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AuthenticationServiceBlockingStub>() {
        @java.lang.Override
        public AuthenticationServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AuthenticationServiceBlockingStub(channel, callOptions);
        }
      };
    return AuthenticationServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static AuthenticationServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<AuthenticationServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<AuthenticationServiceFutureStub>() {
        @java.lang.Override
        public AuthenticationServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new AuthenticationServiceFutureStub(channel, callOptions);
        }
      };
    return AuthenticationServiceFutureStub.newStub(factory, channel);
  }

  /**
   */
  public interface AsyncService {

    /**
     */
    default void isBlackListToken(com.nebo.grpc.lib.AuthenticationRequest request,
        io.grpc.stub.StreamObserver<com.nebo.grpc.lib.BlackListResultResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getIsBlackListTokenMethod(), responseObserver);
    }

    /**
     */
    default void authenticateAppClient(com.nebo.grpc.lib.AppClientAuthenticationRequest request,
        io.grpc.stub.StreamObserver<com.nebo.grpc.lib.AppClientAuthenticationResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getAuthenticateAppClientMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service AuthenticationService.
   */
  public static abstract class AuthenticationServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return AuthenticationServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service AuthenticationService.
   */
  public static final class AuthenticationServiceStub
      extends io.grpc.stub.AbstractAsyncStub<AuthenticationServiceStub> {
    private AuthenticationServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AuthenticationServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AuthenticationServiceStub(channel, callOptions);
    }

    /**
     */
    public void isBlackListToken(com.nebo.grpc.lib.AuthenticationRequest request,
        io.grpc.stub.StreamObserver<com.nebo.grpc.lib.BlackListResultResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getIsBlackListTokenMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     */
    public void authenticateAppClient(com.nebo.grpc.lib.AppClientAuthenticationRequest request,
        io.grpc.stub.StreamObserver<com.nebo.grpc.lib.AppClientAuthenticationResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getAuthenticateAppClientMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service AuthenticationService.
   */
  public static final class AuthenticationServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<AuthenticationServiceBlockingStub> {
    private AuthenticationServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AuthenticationServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AuthenticationServiceBlockingStub(channel, callOptions);
    }

    /**
     */
    public com.nebo.grpc.lib.BlackListResultResponse isBlackListToken(com.nebo.grpc.lib.AuthenticationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getIsBlackListTokenMethod(), getCallOptions(), request);
    }

    /**
     */
    public com.nebo.grpc.lib.AppClientAuthenticationResponse authenticateAppClient(com.nebo.grpc.lib.AppClientAuthenticationRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getAuthenticateAppClientMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service AuthenticationService.
   */
  public static final class AuthenticationServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<AuthenticationServiceFutureStub> {
    private AuthenticationServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected AuthenticationServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new AuthenticationServiceFutureStub(channel, callOptions);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.nebo.grpc.lib.BlackListResultResponse> isBlackListToken(
        com.nebo.grpc.lib.AuthenticationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getIsBlackListTokenMethod(), getCallOptions()), request);
    }

    /**
     */
    public com.google.common.util.concurrent.ListenableFuture<com.nebo.grpc.lib.AppClientAuthenticationResponse> authenticateAppClient(
        com.nebo.grpc.lib.AppClientAuthenticationRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getAuthenticateAppClientMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_IS_BLACK_LIST_TOKEN = 0;
  private static final int METHODID_AUTHENTICATE_APP_CLIENT = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_IS_BLACK_LIST_TOKEN:
          serviceImpl.isBlackListToken((com.nebo.grpc.lib.AuthenticationRequest) request,
              (io.grpc.stub.StreamObserver<com.nebo.grpc.lib.BlackListResultResponse>) responseObserver);
          break;
        case METHODID_AUTHENTICATE_APP_CLIENT:
          serviceImpl.authenticateAppClient((com.nebo.grpc.lib.AppClientAuthenticationRequest) request,
              (io.grpc.stub.StreamObserver<com.nebo.grpc.lib.AppClientAuthenticationResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getIsBlackListTokenMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.nebo.grpc.lib.AuthenticationRequest,
              com.nebo.grpc.lib.BlackListResultResponse>(
                service, METHODID_IS_BLACK_LIST_TOKEN)))
        .addMethod(
          getAuthenticateAppClientMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.nebo.grpc.lib.AppClientAuthenticationRequest,
              com.nebo.grpc.lib.AppClientAuthenticationResponse>(
                service, METHODID_AUTHENTICATE_APP_CLIENT)))
        .build();
  }

  private static abstract class AuthenticationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    AuthenticationServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.nebo.grpc.lib.SecurityProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("AuthenticationService");
    }
  }

  private static final class AuthenticationServiceFileDescriptorSupplier
      extends AuthenticationServiceBaseDescriptorSupplier {
    AuthenticationServiceFileDescriptorSupplier() {}
  }

  private static final class AuthenticationServiceMethodDescriptorSupplier
      extends AuthenticationServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    AuthenticationServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (AuthenticationServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new AuthenticationServiceFileDescriptorSupplier())
              .addMethod(getIsBlackListTokenMethod())
              .addMethod(getAuthenticateAppClientMethod())
              .build();
        }
      }
    }
    return result;
  }
}
