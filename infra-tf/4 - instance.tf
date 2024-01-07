resource "aws_instance" "fiap" {
  ami                    = data.aws_ami.amzlinux.id
  instance_type          = var.instance_type
  key_name               = "fiap"
  vpc_security_group_ids = [aws_security_group.fiap_sg.id]
  subnet_id              = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  user_data = <<-EOF
  #!/bin/bash
  sudo yum update -y
  sudo yum install -y git docker docker.io
  sudo systemctl enable --now docker
  sudo curl -L https://github.com/docker/compose/releases/download/1.22.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  sudo usermod -aG docker $USER
  sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
  sudo systemctl restart docker
  git clone https://github.com/gabriel-rodrigues-f/nodejs-api-ddd.git
  cd nodejs-api-ddd/
  sudo docker build -t nodejs-api-ddd .
  sudo docker-compose up -d
  EOF

  tags = {
    "Name" = "fiap"
  }
}

resource "aws_security_group" "fiap_sg" {
  name        = "challenge-fiap"
  description = "challenge fiap security group"
  vpc_id      = module.vpc.vpc_id

  dynamic "ingress" {
    for_each = [
      { description = "allow http", from_port = 5050, to_port = 5050, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] },
      { description = "allow ssh", from_port = 22, to_port = 22, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }
    ]

    content {
      description = ingress.value.description
      from_port   = ingress.value.from_port
      to_port     = ingress.value.to_port
      protocol    = ingress.value.protocol
      cidr_blocks = ingress.value.cidr_blocks
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}