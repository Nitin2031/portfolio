# Nitin Jangir - DevOps Portfolio

A responsive static portfolio built for direct deployment on one Ubuntu EC2 instance using Nginx.

## Files

- `index.html` - portfolio content and structure
- `style.css` - futuristic DevOps interface and responsive design
- `script.js` - project filters, reveal effects, 3D tilt and animated background
- `resume.pdf` - add your résumé using this exact filename

## Deploy on EC2

Install Nginx:

```bash
sudo apt update
sudo apt install nginx -y
```

Copy the website into the Nginx document root:

```bash
sudo cp index.html style.css script.js resume.pdf /var/www/html/
sudo chown -R www-data:www-data /var/www/html
sudo nginx -t
sudo systemctl restart nginx
```

Allow HTTP port `80` in the EC2 security group and open:

```text
http://YOUR-EC2-PUBLIC-IP
```

For a domain, point a Route 53 `A` record to an Elastic IP attached to this EC2 instance.
