# MetaIC AI - Docker Deployment
FROM nginx:alpine

# Copy built files
COPY dist/package /usr/share/nginx/html

# Copy nginx configuration
COPY dist/package/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

