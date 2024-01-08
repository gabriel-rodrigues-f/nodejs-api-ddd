resource "aws_instance" "fiap" {
  ami                    = data.aws_ami.amzlinux.id
  instance_type          = var.instance_type
  key_name               = "fiap"
  vpc_security_group_ids = [aws_security_group.fiap_sg.id]
  subnet_id              = module.vpc.public_subnets[0]
  associate_public_ip_address = true

  provisioner "local-exec" {
    command = "ansible-playbook -i ansible/inventory.ini ansible/instance.yml"
  }

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