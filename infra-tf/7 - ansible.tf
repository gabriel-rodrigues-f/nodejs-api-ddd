resource "null_resource" "ansible" {
    depends_on = [aws_instance.fiap]

    provisioner "local-exec" {
        command = "ANSIBLE_HOST_KEY_CHECKING=false ansible-playbook -i ansible/inventory.ini ansible/instance.yml"
    }
}