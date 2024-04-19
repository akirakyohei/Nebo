package com.nebo.mediafile.applications.event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class FileSaveFailedEvent {
    private String name;
}
