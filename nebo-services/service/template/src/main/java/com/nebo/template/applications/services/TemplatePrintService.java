package com.nebo.template.applications.services;

import com.github.jknack.handlebars.Context;
import com.github.jknack.handlebars.Handlebars;
import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.template.applications.model.template.TemplatePrintRequest;
import com.nebo.template.infrastructures.util.SizeUtils;
import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder;
import com.openhtmltopdf.pdfboxout.PdfBoxRenderer;
import com.openhtmltopdf.pdfboxout.PdfBoxUtil;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.jsoup.Jsoup;
import org.jsoup.helper.W3CDom;
import org.jsoup.nodes.Document;
import org.springframework.stereotype.Service;

import java.io.BufferedOutputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.MessageFormat;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TemplatePrintService {

    private NeboFeignClient neboFeignClient;

    public byte[] print(long userId, TemplatePrintRequest request) throws IOException {
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

    public byte[] printToImage(long userId, TemplatePrintRequest request) throws IOException {
        var pdfByteArrays = print(userId, request);
        var pdfDocument = Loader.loadPDF(pdfByteArrays);
        try (var imageOutputStream = new ByteArrayOutputStream()) {
            parseToImage(pdfDocument, imageOutputStream);
            return imageOutputStream.toByteArray();
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

    private String fillData(String html, long userId, TemplatePrintRequest request) throws IOException {
        var handlebars = new Handlebars();
        var template = handlebars.compileInline(html);
        var context = buildContextVariables(userId, request.getVariables());
        return template.apply(context);
    }

    private Context buildContextVariables(long userId, Map<String, Object> variables) {
        var user = neboFeignClient.getUserById(userId, B.widthUserId(userId)).getUser();
        var context = Context.newBuilder(Map.of("user", user));
        if (variables != null) {
            context.combine(variables);
        }
        return context.build();
    }

    private Document parseDocument(String html, TemplatePrintRequest request) {
        var document = Jsoup.parse(html, "UTF-8");
        document.outputSettings().syntax(Document.OutputSettings.Syntax.xml);
        document.body().attr("margin", MessageFormat.format("{0} {1} {2} {3}", request.getOptions().getMargin().getTop(),
                request.getOptions().getMargin().getRight(),
                request.getOptions().getMargin().getBottom(),
                request.getOptions().getMargin().getLeft()));
        return document;
    }

    private void parseToPdf(Document document, OutputStream outputStream, TemplatePrintRequest request) throws IOException, IllegalAccessException {
        var width = SizeUtils.splitSize(request.getOptions().getWidth());
        var height = SizeUtils.splitSize(request.getOptions().getHeight());

        var builder = new PdfRendererBuilder();
        builder.toStream(outputStream);
        builder.useDefaultPageSize(SizeUtils.convertSize(width.getKey(), width.getValue()), SizeUtils.convertSize(height.getKey(), height.getValue()), BaseRendererBuilder.PageSizeUnits.MM);
        builder.withW3cDocument(new W3CDom().fromJsoup(document), "/");
        builder.run();
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
