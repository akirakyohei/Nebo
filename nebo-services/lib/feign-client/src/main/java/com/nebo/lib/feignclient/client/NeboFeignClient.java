package com.nebo.lib.feignclient.client;

import com.nebo.lib.feignclient.client.model.FileDataUploadListResponse;
import com.nebo.lib.feignclient.client.model.FileDataUploadRequest;
import com.nebo.lib.feignclient.client.model.FileDataUploadResponse;
import com.nebo.lib.feignclient.client.model.UserResponse;
import feign.HeaderMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@FeignClient(name = "neboClient")
public interface NeboFeignClient {
    @RequestMapping(method = RequestMethod.POST, value = "/api/files")
    FileDataUploadResponse uploadFile(@RequestBody FileDataUploadRequest request, @RequestHeader Map<String, Object> accessToken);


    @RequestMapping(method = RequestMethod.PUT, value = "/api/files/{id}")
    FileDataUploadResponse updateFile(@PathVariable("id") long id, @RequestBody FileDataUploadRequest request, @RequestHeader Map<String, Object> accessToken);

    @RequestMapping(method = RequestMethod.DELETE, value = "/api/files/metadata/{id}")
    void deleteFileMetadata(@PathVariable("id") long id, @RequestHeader Map<String, Object> accessToken);

    @RequestMapping(method = RequestMethod.GET, value = "/api/files/metadata/{id}")
    FileDataUploadResponse getFileMetadata(@PathVariable("id") long id, @RequestHeader Map<String, Object> accessToken);

    @RequestMapping(method = RequestMethod.GET, value = "/api/files/metadata")
    FileDataUploadListResponse getFileMetadataByIds(@RequestParam("ids") List<Long> ids, @RequestHeader Map<String, Object> accessToken);

    @RequestMapping(method = RequestMethod.GET, value = "/api/users/{id}")
    UserResponse getUserById(@PathVariable("id") long id, @RequestHeader Map<String, Object> accessToken);

}
