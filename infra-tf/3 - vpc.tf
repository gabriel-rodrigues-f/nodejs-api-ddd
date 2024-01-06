module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.2"

  name = "fiap-challenge"
  cidr = "172.18.0.0/16"

  azs            = var.availability_zones_name
  public_subnets = ["172.18.1.0/24"]

  enable_nat_gateway     = false
  single_nat_gateway     = false
  one_nat_gateway_per_az = false

  enable_vpn_gateway = false

  tags = {
    Terraform = "true"
  }
}