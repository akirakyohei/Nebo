package com.nebo.template.applications.services;

import com.github.jknack.handlebars.Context;
import com.github.jknack.handlebars.Handlebars;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.template.applications.services.handlebars.EncodeURICompHelper;
import com.nebo.template.applications.model.template.TemplatePrintModel;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.MessageFormat;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TemplatePrintService {

    private final NeboFeignClient neboFeignClient;

    public byte[] print(long userId, TemplatePrintModel request) throws IOException {
        var html = request.getHtml();
        if (request.isFillData()) {
            html = fillData(html, userId, request);
        }
        var document = parseDocument(html, request);
        try (var outputStream = new ByteArrayOutputStream()) {
            parseToPdf(document, outputStream, request);
            return outputStream.toByteArray();
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    public String printToHtml(long userId, TemplatePrintModel request) throws IOException {
        var html = request.getHtml();
        if (request.isFillData()) {
            html = fillData(html, userId, request);
        }
        var document = parseDocument(html, request);
        return document.html();
    }


    public byte[] printToImage(long userId, TemplatePrintModel request) throws IOException {
        var pdfByteArrays = print(userId, request);
        var pdfDocument = Loader.loadPDF(pdfByteArrays);
        try (var imageOutputStream = new ByteArrayOutputStream()) {
            parseToImage(pdfDocument, imageOutputStream);
            return imageOutputStream.toByteArray();
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    private String fillData(String html, long userId, TemplatePrintModel request) throws IOException {
        var handlebars = new Handlebars();
        handlebars.registerHelper("$encodeURIComp", new EncodeURICompHelper());
        var template = handlebars.compileInline(html);
        var context = buildContextVariables(userId, request.getVariables());
        return template.apply(context);
    }

    private Context buildContextVariables(long userId, Map<String, Object> variables) {
        var user = neboFeignClient.getUserById(userId, B.withUserId(userId)).getUser();
        var context = Context.newBuilder(Map.of("user", user));
        if (variables != null) {
            context.combine(variables);
        }
        return context.build();
    }

    private Document parseDocument(String html, TemplatePrintModel request) {
        var document = Jsoup.parse(html, "UTF-8");
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        document.body().attr("padding", MessageFormat.format("{0} {1} {2} {3}", request.getOptions().getMargin().getTop(),
                request.getOptions().getMargin().getRight(),
                request.getOptions().getMargin().getBottom(),
                request.getOptions().getMargin().getLeft()));
        return document;
    }

    private void parseToPdf(Document document, OutputStream outputStream, TemplatePrintModel request) throws IOException, IllegalAccessException {
        var convertProperties = new ConverterProperties();
        convertProperties.setBaseUri("");
        HtmlConverter.convertToPdf(document.html(), outputStream, convertProperties);

    }

    private void parseToImage(PDDocument document, OutputStream outputStream) throws IOException, IllegalAccessException {
        var pdfRender = new PDFRenderer(document);
        int pageCounter = 0;
        for (var page : document.getPages()) {
            var bim = pdfRender.renderImageWithDPI(pageCounter, 72, ImageType.BGR);
            ImageIOUtil.writeImage(bim, "png", outputStream, 72);
        }
    }

}
