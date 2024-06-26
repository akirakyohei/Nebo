package com.nebo.template.infrastructures.utils;

import com.itextpdf.html2pdf.attach.ITagWorker;
import com.itextpdf.html2pdf.attach.ProcessorContext;
import com.itextpdf.html2pdf.attach.impl.DefaultTagWorkerFactory;
import com.itextpdf.html2pdf.html.TagConstants;
import com.itextpdf.styledxmlparser.node.IElementNode;

public class CustomTagWorkerFactory extends DefaultTagWorkerFactory {
     public ITagWorker getCustomTagWorker(IElementNode tag, ProcessorContext context) {
         if (TagConstants.HTML.equals(tag.name())) {
             return new ZeroMarginHtmlTagWorker(tag, context);
         }
         return null;
     }
}



