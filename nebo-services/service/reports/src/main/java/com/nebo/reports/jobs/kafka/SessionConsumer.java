package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.Session;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.utils.KafkaConnectUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaUtils;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SessionConsumer {

    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.sync-session",
            topics = "#{'${spring.kafka.topic.session-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) {
        var op = new String(record.headers().lastHeader("op").value());
        if (!StringUtils.equals(op, "c"))
            return;
        var session = KafkaConnectUtils.<Session>marshall(record.value());
        etlReportService.loadSession(session);
    }

}
