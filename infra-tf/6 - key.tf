resource "aws_key_pair" "deployer" {
  key_name   = "fiap"
  public_key = tls_private_key.rsa.public_key_openssh
}

resource "tls_private_key" "rsa" {
    algorithm = "RSA"
    rsa_bits = 4096
}

resource "local_file" "fiap" {
    content = tls_private_key.rsa.private_key_pem
    filename = "fiap.pem"
    file_permission = "0400"
}