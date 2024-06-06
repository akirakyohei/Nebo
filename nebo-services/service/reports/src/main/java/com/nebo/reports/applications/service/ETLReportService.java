package com.nebo.reports.applications.service;

import com.nebo.reports.applications.model.*;
import com.nebo.types.DebeziumOperation;

public interface ETLReportService {
    void loadUser(User user);

    void loadTemplate(Template template, DebeziumOperation op);

    void aggregateStorageData(StorageModel model);

    void loadUsedTemplate(PrintLog printLog);

    void loadSession(Session session);
}
