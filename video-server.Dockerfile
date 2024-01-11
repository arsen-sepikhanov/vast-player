FROM nginx
COPY nginx/video-server.conf /etc/nginx
COPY assets/video.mp4 /media