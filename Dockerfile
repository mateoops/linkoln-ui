# Production Stage
FROM nginx:1.27.3

# Copy the NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build artifacts from the build stage to NGINX web server
COPY build/ /usr/share/nginx/html

# We need to make sure not to run the container as a non root user
# for better security
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d && \
        touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

USER nginx

# Expose port 80 for the NGINX server
EXPOSE 80

# Command to start NGINX when the container is run
CMD ["nginx", "-g", "daemon off;"]