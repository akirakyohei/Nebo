package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.StorageModel;
import com.nebo.reports.applications.model.Template;
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
public class TemplateStorageConsumer {
    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.template-total-storage",
            topics = "#{'${spring.kafka.topic.template-raw-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) throws IOException {
        var templateKafka = KafkaConnectUtils.marshallRaw(record.value(), Template.class);
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
