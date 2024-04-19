package com.nebo.utils;

import org.antlr.v4.runtime.misc.MurmurHash;
import org.apache.commons.lang3.StringUtils;

import java.math.BigDecimal;


public class MediaUtils {
    public static String buildMediaKey(long userId, String fileName, String fileExtension, String parentFolder) {
        return buildUri(new String[]{generateFolderLinkByUserId(userId), parentFolder, fileName + "." + fileExtension}).toLowerCase();
    }

    private static String buildUri(String[] args) {
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < args.length; i++) {
            if (StringUtils.isEmpty(args[i]))
                continue;

            builder.append(args[i]);
            if (i != (args.length - 1))
                builder.append("/");
        }
        return builder.toString().replace("//", "/");
    }

    private static String generateFolderLinkByUserId(long userId) {
        var str = new BigDecimal(userId + 100_000_000).toString();
        return StringUtils.join(SplitterUtils.split(str, 3), "/") + "/";
    }
}
