package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.PrintLog;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.shared.common.utils.KafkaConnectUtils;
import com.nebo.shared.common.types.DebeziumOperation;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class PrintLogConsumer {

    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.sync-used-template",
            topics = "#{'${spring.kafka.topic.print-log-raw-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) throws IOException {
        var printLogKafka = KafkaConnectUtils.marshallRaw(record.value(), PrintLog.class);

        if (!DebeziumOperation.c.equals(printLogKafka.getOp()))
            return;
        etlReportService.loadUsedTemplate(printLogKafka.getAfter());
    }
}
