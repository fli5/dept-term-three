# 获取 Amazon Linux 2 AMI（加拿大区）
data "aws_ami" "amazon_linux" {
  most_recent = true

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  owners = ["amazon"]
}

# 安全组
resource "aws_security_group" "rails_sg" {
  name        = "rails-web-sg"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Free Tier EC2 实例
resource "aws_instance" "rails" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = "t2.micro"
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.rails_sg.id]
  user_data              = file("${path.module}/user_data.sh")

  tags = {
    Name = "Rails-App-Server"
  }
}
