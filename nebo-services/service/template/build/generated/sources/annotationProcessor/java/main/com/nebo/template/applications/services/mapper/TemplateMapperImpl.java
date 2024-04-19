package com.nebo.template.applications.services.mapper;

import com.nebo.template.applications.model.template.TemplateCreateRequest;
import com.nebo.template.applications.model.template.TemplateResponse;
import com.nebo.template.applications.model.template.TemplateUpdateRequest;
import com.nebo.template.infrastructures.domain.model.Template;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-04-18T13:26:41+0700",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.6.jar, environment: Java 17.0.7 (Oracle Corporation)"
)
@Component
public class TemplateMapperImpl implements TemplateMapper {

    @Override
    public Template fromRequestToDomain(TemplateCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Template.TemplateBuilder template = Template.builder();

        template.name( request.getName() );
        template.paperTypeId( request.getPaperTypeId() );
        List<Integer> list = request.getCategoryIds();
        if ( list != null ) {
            template.categoryIds( new ArrayList<Integer>( list ) );
        }
        Map<String, Object> map = request.getData();
        if ( map != null ) {
            template.data( new LinkedHashMap<String, Object>( map ) );
        }
        Map<String, Object> map1 = request.getParams();
        if ( map1 != null ) {
            template.params( new LinkedHashMap<String, Object>( map1 ) );
        }

        return template.build();
    }

    @Override
    public void updateTemplate(TemplateUpdateRequest request, Template template) {
        if ( request == null ) {
            return;
        }

        if ( request.getName() != null ) {
            template.setName( request.getName() );
        }
        if ( template.getCategoryIds() != null ) {
            List<Integer> list = request.getCategoryIds();
            if ( list != null ) {
                template.getCategoryIds().clear();
                template.getCategoryIds().addAll( list );
            }
        }
        else {
            List<Integer> list = request.getCategoryIds();
            if ( list != null ) {
                template.setCategoryIds( new ArrayList<Integer>( list ) );
            }
        }
        if ( template.getData() != null ) {
            Map<String, Object> map = request.getData();
            if ( map != null ) {
                template.getData().clear();
                template.getData().putAll( map );
            }
        }
        else {
            Map<String, Object> map = request.getData();
            if ( map != null ) {
                template.setData( new LinkedHashMap<String, Object>( map ) );
            }
        }
        if ( template.getParams() != null ) {
            Map<String, Object> map1 = request.getParams();
            if ( map1 != null ) {
                template.getParams().clear();
                template.getParams().putAll( map1 );
            }
        }
        else {
            Map<String, Object> map1 = request.getParams();
            if ( map1 != null ) {
                template.setParams( new LinkedHashMap<String, Object>( map1 ) );
            }
        }
    }

    @Override
    public TemplateResponse fromDomainToResponse(Template template) {
        if ( template == null ) {
            return null;
        }

        TemplateResponse templateResponse = new TemplateResponse();

        return templateResponse;
    }
}
