package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.FileData;
import com.nebo.reports.applications.model.StorageModel;
import com.nebo.reports.applications.model.Template;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.types.DebeziumOperation;
import com.nebo.utils.KafkaConnectUtils;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class FileDataStorageConsumer {
    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.file-data-total-storage",
            topics = "#{'${spring.kafka.topic.file-data-raw-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) throws IOException {
        var templateKafka = KafkaConnectUtils.marshallRaw(record.value(),FileData.class);
        var delta = 0L;
        var userId = 0L;
        if (DebeziumOperation.c.equals(templateKafka.getOp())) {
            delta = templateKafka.getAfter().getSize();
            userId = templateKafka.getAfter().getUserId();
        } else if (DebeziumOperation.d.equals(templateKafka.getOp())) {
            delta = -templateKafka.getBefore().getSize();
            userId = templateKafka.getBefore().getUserId();
        } else {
            delta = templateKafka.getAfter().getSize() - templateKafka.getBefore().getSize();
            userId = templateKafka.getAfter().getUserId();
        }
        if (delta != 0) {
            etlReportService.aggregateStorageData(StorageModel.builder()
                    .userId(userId)
                    .adjustTotalData(delta)
                    .build());
        }

    }
}
