1. Chuẩn bị môi trường:
- Chuẩn bị môi trường docker.
- Cập nhật các cấu hình ngữ cảnh trong /nebo-services/service/configserver/src/resources/cloud-config, cấu hình ngữ cảnh trong /nebo-docker/docker-compose.yaml.
2. Khởi tạo ngữ cảnh hệ thống:
- chạy lệnh `docker-compose up -d` trong thư mục /nebo-docker
- thiết lập database, chạy các lệnh sql trong /nebo-database
- thiết lập kết nối MinIO server.
- thiết lập định tuyến đến các service trong Kong gateway.
4. Chạy chương trình: 
- Khởi chạy lần lượt tất cả các service backend configserver, sso, mediafile,template. 
- Khởi chạy chương trình giao diện. 
