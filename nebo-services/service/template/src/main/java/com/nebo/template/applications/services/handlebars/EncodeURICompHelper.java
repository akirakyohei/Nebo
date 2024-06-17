package com.nebo.template.applications.services.handlebars;

import com.github.jknack.handlebars.Helper;
import com.github.jknack.handlebars.Options;

import java.io.IOException;

public class EncodeURICompHelper implements Helper<String> {
    @Override
    public Object apply(String context, Options options) throws IOException {
        if (context == null)
            return null;
        return EncodingUtil.encodeURIComponent(context);
    }
}
