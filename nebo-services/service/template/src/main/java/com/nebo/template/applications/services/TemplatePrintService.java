package com.nebo.template.applications.services;

import com.github.jknack.handlebars.Context;
import com.github.jknack.handlebars.Handlebars;

import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.font.FontProvider;
import com.itextpdf.styledxmlparser.css.util.CssDimensionParsingUtils;
import com.nebo.lib.feignclient.client.B;
import com.nebo.lib.feignclient.client.NeboFeignClient;
import com.nebo.template.applications.services.handlebars.EncodeURICompHelper;
import com.nebo.template.applications.model.template.TemplatePrintModel;
import com.nebo.template.infrastructures.utils.CustomTagWorkerFactory;
import com.nebo.template.infrastructures.utils.SizeUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
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
import java.util.ArrayList;
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
        var styles = new ArrayList<>();
        if (request.getOptions().isLandscape()) {
            styles.add("height:" + request.getOptions().getWidth() + ";");
            styles.add("width:" + request.getOptions().getHeight() + ";");
        } else {
            styles.add("height:" + request.getOptions().getHeight() + ";");
            styles.add("width:" + request.getOptions().getWidth() + ";");
        }
        styles.add("padding:" + MessageFormat.format("{0} {1} {2} {3};", request.getOptions().getMargin().getTop(),
                request.getOptions().getMargin().getRight(),
                request.getOptions().getMargin().getBottom(),
                request.getOptions().getMargin().getLeft()));
        document.body().attr("style", StringUtils.join(styles, " "));
        return document;
    }

    private void parseToPdf(Document document, OutputStream outputStream, TemplatePrintModel request) throws IOException, IllegalAccessException {
        var convertProperties = new ConverterProperties();
        convertProperties.setBaseUri("");
        convertProperties.setTagWorkerFactory(new CustomTagWorkerFactory());
        var pdfDoc = new PdfDocument(new PdfWriter(outputStream));
        var widthSplit = SizeUtils.splitSize(request.getOptions().isLandscape() ? request.getOptions().getHeight() : request.getOptions().getWidth());
        var heightSplit = SizeUtils.splitSize(!request.getOptions().isLandscape() ? request.getOptions().getHeight() : request.getOptions().getWidth());
        var width = CssDimensionParsingUtils.parseLengthValueToPt(request.getOptions().isLandscape() ? request.getOptions().getHeight() : request.getOptions().getWidth(), 12, 12).getValue();
        var height = CssDimensionParsingUtils.parseLengthValueToPt(!request.getOptions().isLandscape() ? request.getOptions().getHeight() : request.getOptions().getWidth(), 12, 12).getValue();
        pdfDoc.setDefaultPageSize(new PageSize(width, height));
        HtmlConverter.convertToPdf(document.html(), pdfDoc, convertProperties);
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
