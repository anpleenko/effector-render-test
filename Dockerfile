FROM vaeum/nginx-static:spa
RUN rm -rf /usr/share/nginx/html/*
COPY dist /usr/share/nginx/html/
