// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: security.proto

// Protobuf Java Version: 3.25.3
package com.nebo.grpc.lib;

public interface UserCredentialOrBuilder extends
    // @@protoc_insertion_point(interface_extends:com.nebo.grpc.security.UserCredential)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <code>int64 id = 1;</code>
   * @return The id.
   */
  long getId();

  /**
   * <code>string first_name = 3;</code>
   * @return The firstName.
   */
  java.lang.String getFirstName();
  /**
   * <code>string first_name = 3;</code>
   * @return The bytes for firstName.
   */
  com.google.protobuf.ByteString
      getFirstNameBytes();

  /**
   * <code>string last_name = 4;</code>
   * @return The lastName.
   */
  java.lang.String getLastName();
  /**
   * <code>string last_name = 4;</code>
   * @return The bytes for lastName.
   */
  com.google.protobuf.ByteString
      getLastNameBytes();

  /**
   * <code>repeated string permissions = 2;</code>
   * @return A list containing the permissions.
   */
  java.util.List<java.lang.String>
      getPermissionsList();
  /**
   * <code>repeated string permissions = 2;</code>
   * @return The count of permissions.
   */
  int getPermissionsCount();
  /**
   * <code>repeated string permissions = 2;</code>
   * @param index The index of the element to return.
   * @return The permissions at the given index.
   */
  java.lang.String getPermissions(int index);
  /**
   * <code>repeated string permissions = 2;</code>
   * @param index The index of the value to return.
   * @return The bytes of the permissions at the given index.
   */
  com.google.protobuf.ByteString
      getPermissionsBytes(int index);
}
