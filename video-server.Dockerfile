FROM nginx
COPY nginx/video-server.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
RUN mv /etc/nginx/conf.d/video-server.conf /etc/nginx/conf.d/default.conf
COPY assets/video.mp4 /media