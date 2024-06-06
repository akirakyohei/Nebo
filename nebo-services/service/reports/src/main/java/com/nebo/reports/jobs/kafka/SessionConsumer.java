package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.Session;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.types.DebeziumOperation;
import com.nebo.utils.KafkaConnectUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaUtils;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class SessionConsumer {

    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.sync-session",
            topics = "#{'${spring.kafka.topic.session-raw-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) throws IOException {
        try {
            var sessionKafka = KafkaConnectUtils.marshallRaw(record.value(), Session.class);
            if (!DebeziumOperation.c.equals(sessionKafka.getOp()))
                return;
            etlReportService.loadSession(sessionKafka.getAfter());
        } catch (Exception ex) {
            throw ex;
        }
    }

}
