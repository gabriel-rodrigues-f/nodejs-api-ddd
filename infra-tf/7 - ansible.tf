provisioner "local-exec" {
    command = "ansible-playbook -i ansible/inventory.ini ansible/instance.yml"
}