output "instance_ip_addr" {
    value = aws_instance.fiap.public_ip
}

# Inventory for Ansible
resource "local_file" "inventory" {
    content = aws_instance.fiap.public_ip
    filename = "ansible/inventory.ini"
}