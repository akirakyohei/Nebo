export type FileDataUpload={
    id: number;
    file_name: string;
    key: string;
    extension: string;
    size: number;
}

export type FileDataUploadRequest={
    name: string;
    content_type: string;
    data: Buffer;
}