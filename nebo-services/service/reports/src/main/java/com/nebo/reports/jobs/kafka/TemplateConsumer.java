package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.Session;
import com.nebo.reports.applications.model.Template;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.types.DebeziumOperation;
import com.nebo.utils.KafkaConnectUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class TemplateConsumer {

    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.sync-template",
            topics = "#{'${spring.kafka.topic.template-raw-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) {
        var templateKafka = KafkaConnectUtils.<Template>marshallRaw(record.value());
        etlReportService.loadTemplate(templateKafka.getAfter(), templateKafka.getOp());
    }
}
