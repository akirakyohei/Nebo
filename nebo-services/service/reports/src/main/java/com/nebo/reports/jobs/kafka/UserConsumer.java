package com.nebo.reports.jobs.kafka;

import com.nebo.reports.applications.model.PrintLog;
import com.nebo.reports.applications.model.User;
import com.nebo.reports.applications.service.ETLReportService;
import com.nebo.utils.KafkaConnectUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserConsumer {

    private final ETLReportService etlReportService;

    @KafkaListener(
            groupId = "nebo.kafka.groupId.sync-user",
            topics = "#{'${spring.kafka.topic.user-log}'.split(',')}",
            concurrency = "5"
    )
    public void process(ConsumerRecord<String, String> record) {
        var op = new String(record.headers().lastHeader("op").value());
        if (!StringUtils.equals(op, "d"))
            return;
        var user = KafkaConnectUtils.<User>marshall(record.value());
        etlReportService.loadUser(user);
    }
}
