package com.nebo.reports.applications.service;

import com.nebo.reports.applications.model.PrintLog;
import com.nebo.reports.applications.model.StorageModel;
import com.nebo.reports.applications.model.Template;
import com.nebo.reports.applications.model.User;
import com.nebo.reports.insfrastructures.domain.model.DimUser;
import com.nebo.types.DebeziumOperation;

public interface ETLReportService {
    void loadUser(User user);

    void loadTemplate(Template template, DebeziumOperation op);

    void aggregateStorageData(StorageModel model);

    void loadUsedTemplate(PrintLog printLog);
}
