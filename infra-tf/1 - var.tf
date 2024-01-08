variable "availability_zones_name" {
  description = "Availability Zones for VPC"
  type    = list(string)
  default = ["us-east-1a", "us-east-1b", "us-east-1c"]
}

variable "instance_type" {
  description = "EC2 Instance Type - Instance Sizing"
  type        = string
  default     = "t2.micro"
}