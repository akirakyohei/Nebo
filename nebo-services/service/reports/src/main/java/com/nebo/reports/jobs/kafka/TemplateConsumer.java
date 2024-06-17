package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.Template;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.shared.common.types.DebeziumOperation;
import com.nebo.shared.common.utils.KafkaConnectUtils;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class TemplateConsumer {

    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.sync-template",
            topics = "#{'${spring.kafka.topic.template-raw-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) throws IOException {
        var templateKafka = KafkaConnectUtils.marshallRaw(record.value(), Template.class);
        etlReportService.loadTemplate(DebeziumOperation.d.equals(templateKafka.getOp()) ? templateKafka.getBefore() : templateKafka.getAfter(), templateKafka.getOp());
    }
}
