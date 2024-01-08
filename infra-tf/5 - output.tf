output "instance_ip_addr" {
    value = aws_instance.fiap.public_ip
}

# Inventory for Ansible
data "template_file" "ansible_inventory" {
    template = file("ansible/inventory.tmpl")
    vars = {
        instance_ip = aws_instance.fiap.public_ip
    }
}

resource "local_file" "ansible_inventory" {
    content = data.template_file.ansible_inventory.rendered
    filename = "ansible/inventory.ini"
}