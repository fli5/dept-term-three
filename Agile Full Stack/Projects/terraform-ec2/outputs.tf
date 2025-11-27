output "rails_server_ip" {
  description = "Public IP of EC2 instance"
  value       = aws_instance.rails.public_ip
}
