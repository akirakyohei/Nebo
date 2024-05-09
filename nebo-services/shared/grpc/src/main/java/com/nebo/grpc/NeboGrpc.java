package com.nebo.grpc;

import com.nebo.grpc.lib.AuthenticationRequest;
import com.nebo.grpc.lib.AuthenticationServiceGrpc;
import io.grpc.ManagedChannelBuilder;
import net.devh.boot.grpc.client.security.CallCredentialsHelper;
import org.springframework.util.Assert;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Objects;

public class NeboGrpc {

    public final AuthenticationServiceGrpc.AuthenticationServiceBlockingStub authenticationService;

    private NeboGrpc(Builder builder) {
        var channelBuilder = ManagedChannelBuilder.forAddress(builder.url.getHost(), builder.url.getPort());
        if (builder.url.getProtocol().equals("http")) {
            channelBuilder = channelBuilder.usePlaintext();
        }
        var channel = channelBuilder.build();
        this.authenticationService = AuthenticationServiceGrpc.newBlockingStub(channel);
//                .withCallCredentials(
//                CallCredentialsHelper.basicAuth(builder.userName, builder.password)
//        );
    }


    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private URL url;
        private String userName;
        private String password;

        public Builder url(String url) {
            URL theUrl;
            try {
                theUrl = new URL(url);
            } catch (MalformedURLException e) {
                throw new IllegalArgumentException("invalid url format: " + e.getMessage());
            }
            if (!Objects.equals(theUrl.getProtocol(), "http") && !Objects.equals(theUrl.getProtocol(), "https")) {
                throw new IllegalArgumentException("unsupported url scheme: " + theUrl.getProtocol());
            }
            this.url = theUrl;
            return this;
        }

        public Builder userName(String userName) {
            Assert.notNull(userName, "Username cannot empty");
            this.userName = userName;
            return this;
        }

        public Builder password(String password) {
            Assert.notNull(password, "Password cannot empty");
            this.password = password;
            return this;
        }

        public NeboGrpc build() {
            if (url == null) {
                throw new IllegalArgumentException("missing url argument");
            }
            return new NeboGrpc(this);
        }
    }
}
