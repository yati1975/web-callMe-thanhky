FROM nginx:alpine

# 複製網站檔案到 nginx 預設目錄
COPY . /usr/share/nginx/html

# 替換 nginx 預設設定（可選）
# COPY nginx.conf /etc/nginx/nginx.conf

