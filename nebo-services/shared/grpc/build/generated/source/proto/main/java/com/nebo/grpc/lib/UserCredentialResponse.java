// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: security.proto

// Protobuf Java Version: 4.26.1
package com.nebo.grpc.lib;

/**
 * Protobuf type {@code com.nebo.grpc.security.UserCredentialResponse}
 */
public final class UserCredentialResponse extends
    com.google.protobuf.GeneratedMessage implements
    // @@protoc_insertion_point(message_implements:com.nebo.grpc.security.UserCredentialResponse)
    UserCredentialResponseOrBuilder {
private static final long serialVersionUID = 0L;
  static {
    com.google.protobuf.RuntimeVersion.validateProtobufGencodeVersion(
      com.google.protobuf.RuntimeVersion.RuntimeDomain.PUBLIC,
      /* major= */ 4,
      /* minor= */ 26,
      /* patch= */ 1,
      /* suffix= */ "",
      UserCredentialResponse.class.getName());
  }
  // Use UserCredentialResponse.newBuilder() to construct.
  private UserCredentialResponse(com.google.protobuf.GeneratedMessage.Builder<?> builder) {
    super(builder);
  }
  private UserCredentialResponse() {
  }

  public static final com.google.protobuf.Descriptors.Descriptor
      getDescriptor() {
    return com.nebo.grpc.lib.SecurityProto.internal_static_com_nebo_grpc_security_UserCredentialResponse_descriptor;
  }

  @java.lang.Override
  protected com.google.protobuf.GeneratedMessage.FieldAccessorTable
      internalGetFieldAccessorTable() {
    return com.nebo.grpc.lib.SecurityProto.internal_static_com_nebo_grpc_security_UserCredentialResponse_fieldAccessorTable
        .ensureFieldAccessorsInitialized(
            com.nebo.grpc.lib.UserCredentialResponse.class, com.nebo.grpc.lib.UserCredentialResponse.Builder.class);
  }

  private int bitField0_;
  public static final int USER_CREDENTIAL_FIELD_NUMBER = 1;
  private com.nebo.grpc.lib.UserCredential userCredential_;
  /**
   * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
   * @return Whether the userCredential field is set.
   */
  @java.lang.Override
  public boolean hasUserCredential() {
    return ((bitField0_ & 0x00000001) != 0);
  }
  /**
   * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
   * @return The userCredential.
   */
  @java.lang.Override
  public com.nebo.grpc.lib.UserCredential getUserCredential() {
    return userCredential_ == null ? com.nebo.grpc.lib.UserCredential.getDefaultInstance() : userCredential_;
  }
  /**
   * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
   */
  @java.lang.Override
  public com.nebo.grpc.lib.UserCredentialOrBuilder getUserCredentialOrBuilder() {
    return userCredential_ == null ? com.nebo.grpc.lib.UserCredential.getDefaultInstance() : userCredential_;
  }

  private byte memoizedIsInitialized = -1;
  @java.lang.Override
  public final boolean isInitialized() {
    byte isInitialized = memoizedIsInitialized;
    if (isInitialized == 1) return true;
    if (isInitialized == 0) return false;

    memoizedIsInitialized = 1;
    return true;
  }

  @java.lang.Override
  public void writeTo(com.google.protobuf.CodedOutputStream output)
                      throws java.io.IOException {
    if (((bitField0_ & 0x00000001) != 0)) {
      output.writeMessage(1, getUserCredential());
    }
    getUnknownFields().writeTo(output);
  }

  @java.lang.Override
  public int getSerializedSize() {
    int size = memoizedSize;
    if (size != -1) return size;

    size = 0;
    if (((bitField0_ & 0x00000001) != 0)) {
      size += com.google.protobuf.CodedOutputStream
        .computeMessageSize(1, getUserCredential());
    }
    size += getUnknownFields().getSerializedSize();
    memoizedSize = size;
    return size;
  }

  @java.lang.Override
  public boolean equals(final java.lang.Object obj) {
    if (obj == this) {
     return true;
    }
    if (!(obj instanceof com.nebo.grpc.lib.UserCredentialResponse)) {
      return super.equals(obj);
    }
    com.nebo.grpc.lib.UserCredentialResponse other = (com.nebo.grpc.lib.UserCredentialResponse) obj;

    if (hasUserCredential() != other.hasUserCredential()) return false;
    if (hasUserCredential()) {
      if (!getUserCredential()
          .equals(other.getUserCredential())) return false;
    }
    if (!getUnknownFields().equals(other.getUnknownFields())) return false;
    return true;
  }

  @java.lang.Override
  public int hashCode() {
    if (memoizedHashCode != 0) {
      return memoizedHashCode;
    }
    int hash = 41;
    hash = (19 * hash) + getDescriptor().hashCode();
    if (hasUserCredential()) {
      hash = (37 * hash) + USER_CREDENTIAL_FIELD_NUMBER;
      hash = (53 * hash) + getUserCredential().hashCode();
    }
    hash = (29 * hash) + getUnknownFields().hashCode();
    memoizedHashCode = hash;
    return hash;
  }

  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      java.nio.ByteBuffer data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      java.nio.ByteBuffer data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      com.google.protobuf.ByteString data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      com.google.protobuf.ByteString data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(byte[] data)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      byte[] data,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws com.google.protobuf.InvalidProtocolBufferException {
    return PARSER.parseFrom(data, extensionRegistry);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessage
        .parseWithIOException(PARSER, input);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessage
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  public static com.nebo.grpc.lib.UserCredentialResponse parseDelimitedFrom(java.io.InputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessage
        .parseDelimitedWithIOException(PARSER, input);
  }

  public static com.nebo.grpc.lib.UserCredentialResponse parseDelimitedFrom(
      java.io.InputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessage
        .parseDelimitedWithIOException(PARSER, input, extensionRegistry);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      com.google.protobuf.CodedInputStream input)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessage
        .parseWithIOException(PARSER, input);
  }
  public static com.nebo.grpc.lib.UserCredentialResponse parseFrom(
      com.google.protobuf.CodedInputStream input,
      com.google.protobuf.ExtensionRegistryLite extensionRegistry)
      throws java.io.IOException {
    return com.google.protobuf.GeneratedMessage
        .parseWithIOException(PARSER, input, extensionRegistry);
  }

  @java.lang.Override
  public Builder newBuilderForType() { return newBuilder(); }
  public static Builder newBuilder() {
    return DEFAULT_INSTANCE.toBuilder();
  }
  public static Builder newBuilder(com.nebo.grpc.lib.UserCredentialResponse prototype) {
    return DEFAULT_INSTANCE.toBuilder().mergeFrom(prototype);
  }
  @java.lang.Override
  public Builder toBuilder() {
    return this == DEFAULT_INSTANCE
        ? new Builder() : new Builder().mergeFrom(this);
  }

  @java.lang.Override
  protected Builder newBuilderForType(
      com.google.protobuf.GeneratedMessage.BuilderParent parent) {
    Builder builder = new Builder(parent);
    return builder;
  }
  /**
   * Protobuf type {@code com.nebo.grpc.security.UserCredentialResponse}
   */
  public static final class Builder extends
      com.google.protobuf.GeneratedMessage.Builder<Builder> implements
      // @@protoc_insertion_point(builder_implements:com.nebo.grpc.security.UserCredentialResponse)
      com.nebo.grpc.lib.UserCredentialResponseOrBuilder {
    public static final com.google.protobuf.Descriptors.Descriptor
        getDescriptor() {
      return com.nebo.grpc.lib.SecurityProto.internal_static_com_nebo_grpc_security_UserCredentialResponse_descriptor;
    }

    @java.lang.Override
    protected com.google.protobuf.GeneratedMessage.FieldAccessorTable
        internalGetFieldAccessorTable() {
      return com.nebo.grpc.lib.SecurityProto.internal_static_com_nebo_grpc_security_UserCredentialResponse_fieldAccessorTable
          .ensureFieldAccessorsInitialized(
              com.nebo.grpc.lib.UserCredentialResponse.class, com.nebo.grpc.lib.UserCredentialResponse.Builder.class);
    }

    // Construct using com.nebo.grpc.lib.UserCredentialResponse.newBuilder()
    private Builder() {
      maybeForceBuilderInitialization();
    }

    private Builder(
        com.google.protobuf.GeneratedMessage.BuilderParent parent) {
      super(parent);
      maybeForceBuilderInitialization();
    }
    private void maybeForceBuilderInitialization() {
      if (com.google.protobuf.GeneratedMessage
              .alwaysUseFieldBuilders) {
        getUserCredentialFieldBuilder();
      }
    }
    @java.lang.Override
    public Builder clear() {
      super.clear();
      bitField0_ = 0;
      userCredential_ = null;
      if (userCredentialBuilder_ != null) {
        userCredentialBuilder_.dispose();
        userCredentialBuilder_ = null;
      }
      return this;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.Descriptor
        getDescriptorForType() {
      return com.nebo.grpc.lib.SecurityProto.internal_static_com_nebo_grpc_security_UserCredentialResponse_descriptor;
    }

    @java.lang.Override
    public com.nebo.grpc.lib.UserCredentialResponse getDefaultInstanceForType() {
      return com.nebo.grpc.lib.UserCredentialResponse.getDefaultInstance();
    }

    @java.lang.Override
    public com.nebo.grpc.lib.UserCredentialResponse build() {
      com.nebo.grpc.lib.UserCredentialResponse result = buildPartial();
      if (!result.isInitialized()) {
        throw newUninitializedMessageException(result);
      }
      return result;
    }

    @java.lang.Override
    public com.nebo.grpc.lib.UserCredentialResponse buildPartial() {
      com.nebo.grpc.lib.UserCredentialResponse result = new com.nebo.grpc.lib.UserCredentialResponse(this);
      if (bitField0_ != 0) { buildPartial0(result); }
      onBuilt();
      return result;
    }

    private void buildPartial0(com.nebo.grpc.lib.UserCredentialResponse result) {
      int from_bitField0_ = bitField0_;
      int to_bitField0_ = 0;
      if (((from_bitField0_ & 0x00000001) != 0)) {
        result.userCredential_ = userCredentialBuilder_ == null
            ? userCredential_
            : userCredentialBuilder_.build();
        to_bitField0_ |= 0x00000001;
      }
      result.bitField0_ |= to_bitField0_;
    }

    @java.lang.Override
    public Builder mergeFrom(com.google.protobuf.Message other) {
      if (other instanceof com.nebo.grpc.lib.UserCredentialResponse) {
        return mergeFrom((com.nebo.grpc.lib.UserCredentialResponse)other);
      } else {
        super.mergeFrom(other);
        return this;
      }
    }

    public Builder mergeFrom(com.nebo.grpc.lib.UserCredentialResponse other) {
      if (other == com.nebo.grpc.lib.UserCredentialResponse.getDefaultInstance()) return this;
      if (other.hasUserCredential()) {
        mergeUserCredential(other.getUserCredential());
      }
      this.mergeUnknownFields(other.getUnknownFields());
      onChanged();
      return this;
    }

    @java.lang.Override
    public final boolean isInitialized() {
      return true;
    }

    @java.lang.Override
    public Builder mergeFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws java.io.IOException {
      if (extensionRegistry == null) {
        throw new java.lang.NullPointerException();
      }
      try {
        boolean done = false;
        while (!done) {
          int tag = input.readTag();
          switch (tag) {
            case 0:
              done = true;
              break;
            case 10: {
              input.readMessage(
                  getUserCredentialFieldBuilder().getBuilder(),
                  extensionRegistry);
              bitField0_ |= 0x00000001;
              break;
            } // case 10
            default: {
              if (!super.parseUnknownField(input, extensionRegistry, tag)) {
                done = true; // was an endgroup tag
              }
              break;
            } // default:
          } // switch (tag)
        } // while (!done)
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        throw e.unwrapIOException();
      } finally {
        onChanged();
      } // finally
      return this;
    }
    private int bitField0_;

    private com.nebo.grpc.lib.UserCredential userCredential_;
    private com.google.protobuf.SingleFieldBuilder<
        com.nebo.grpc.lib.UserCredential, com.nebo.grpc.lib.UserCredential.Builder, com.nebo.grpc.lib.UserCredentialOrBuilder> userCredentialBuilder_;
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     * @return Whether the userCredential field is set.
     */
    public boolean hasUserCredential() {
      return ((bitField0_ & 0x00000001) != 0);
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     * @return The userCredential.
     */
    public com.nebo.grpc.lib.UserCredential getUserCredential() {
      if (userCredentialBuilder_ == null) {
        return userCredential_ == null ? com.nebo.grpc.lib.UserCredential.getDefaultInstance() : userCredential_;
      } else {
        return userCredentialBuilder_.getMessage();
      }
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    public Builder setUserCredential(com.nebo.grpc.lib.UserCredential value) {
      if (userCredentialBuilder_ == null) {
        if (value == null) {
          throw new NullPointerException();
        }
        userCredential_ = value;
      } else {
        userCredentialBuilder_.setMessage(value);
      }
      bitField0_ |= 0x00000001;
      onChanged();
      return this;
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    public Builder setUserCredential(
        com.nebo.grpc.lib.UserCredential.Builder builderForValue) {
      if (userCredentialBuilder_ == null) {
        userCredential_ = builderForValue.build();
      } else {
        userCredentialBuilder_.setMessage(builderForValue.build());
      }
      bitField0_ |= 0x00000001;
      onChanged();
      return this;
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    public Builder mergeUserCredential(com.nebo.grpc.lib.UserCredential value) {
      if (userCredentialBuilder_ == null) {
        if (((bitField0_ & 0x00000001) != 0) &&
          userCredential_ != null &&
          userCredential_ != com.nebo.grpc.lib.UserCredential.getDefaultInstance()) {
          getUserCredentialBuilder().mergeFrom(value);
        } else {
          userCredential_ = value;
        }
      } else {
        userCredentialBuilder_.mergeFrom(value);
      }
      if (userCredential_ != null) {
        bitField0_ |= 0x00000001;
        onChanged();
      }
      return this;
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    public Builder clearUserCredential() {
      bitField0_ = (bitField0_ & ~0x00000001);
      userCredential_ = null;
      if (userCredentialBuilder_ != null) {
        userCredentialBuilder_.dispose();
        userCredentialBuilder_ = null;
      }
      onChanged();
      return this;
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    public com.nebo.grpc.lib.UserCredential.Builder getUserCredentialBuilder() {
      bitField0_ |= 0x00000001;
      onChanged();
      return getUserCredentialFieldBuilder().getBuilder();
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    public com.nebo.grpc.lib.UserCredentialOrBuilder getUserCredentialOrBuilder() {
      if (userCredentialBuilder_ != null) {
        return userCredentialBuilder_.getMessageOrBuilder();
      } else {
        return userCredential_ == null ?
            com.nebo.grpc.lib.UserCredential.getDefaultInstance() : userCredential_;
      }
    }
    /**
     * <code>.com.nebo.grpc.security.UserCredential user_credential = 1;</code>
     */
    private com.google.protobuf.SingleFieldBuilder<
        com.nebo.grpc.lib.UserCredential, com.nebo.grpc.lib.UserCredential.Builder, com.nebo.grpc.lib.UserCredentialOrBuilder> 
        getUserCredentialFieldBuilder() {
      if (userCredentialBuilder_ == null) {
        userCredentialBuilder_ = new com.google.protobuf.SingleFieldBuilder<
            com.nebo.grpc.lib.UserCredential, com.nebo.grpc.lib.UserCredential.Builder, com.nebo.grpc.lib.UserCredentialOrBuilder>(
                getUserCredential(),
                getParentForChildren(),
                isClean());
        userCredential_ = null;
      }
      return userCredentialBuilder_;
    }

    // @@protoc_insertion_point(builder_scope:com.nebo.grpc.security.UserCredentialResponse)
  }

  // @@protoc_insertion_point(class_scope:com.nebo.grpc.security.UserCredentialResponse)
  private static final com.nebo.grpc.lib.UserCredentialResponse DEFAULT_INSTANCE;
  static {
    DEFAULT_INSTANCE = new com.nebo.grpc.lib.UserCredentialResponse();
  }

  public static com.nebo.grpc.lib.UserCredentialResponse getDefaultInstance() {
    return DEFAULT_INSTANCE;
  }

  private static final com.google.protobuf.Parser<UserCredentialResponse>
      PARSER = new com.google.protobuf.AbstractParser<UserCredentialResponse>() {
    @java.lang.Override
    public UserCredentialResponse parsePartialFrom(
        com.google.protobuf.CodedInputStream input,
        com.google.protobuf.ExtensionRegistryLite extensionRegistry)
        throws com.google.protobuf.InvalidProtocolBufferException {
      Builder builder = newBuilder();
      try {
        builder.mergeFrom(input, extensionRegistry);
      } catch (com.google.protobuf.InvalidProtocolBufferException e) {
        throw e.setUnfinishedMessage(builder.buildPartial());
      } catch (com.google.protobuf.UninitializedMessageException e) {
        throw e.asInvalidProtocolBufferException().setUnfinishedMessage(builder.buildPartial());
      } catch (java.io.IOException e) {
        throw new com.google.protobuf.InvalidProtocolBufferException(e)
            .setUnfinishedMessage(builder.buildPartial());
      }
      return builder.buildPartial();
    }
  };

  public static com.google.protobuf.Parser<UserCredentialResponse> parser() {
    return PARSER;
  }

  @java.lang.Override
  public com.google.protobuf.Parser<UserCredentialResponse> getParserForType() {
    return PARSER;
  }

  @java.lang.Override
  public com.nebo.grpc.lib.UserCredentialResponse getDefaultInstanceForType() {
    return DEFAULT_INSTANCE;
  }

}
