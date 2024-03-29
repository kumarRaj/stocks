terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }
}

# Configure the AWS Provider
provider "aws" {
  region = "us-east-1"
}

data "aws_ami" "ubuntu" {
  most_recent = true
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
  owners = ["099720109477"] # Canonical
}

resource "aws_key_pair" "stocks" {
  key_name   = "stocks"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDbGKb4GigIkrX2SFfpfzgcKSOUAcqA2RLACpofAgx+zVL3g4UzbcqihbDYevl5xEetg6WLNeUmc+7SYOMOv29XWDycNtkc5JpCmNIWM9Xu+HlQehKlU9Pe/cLawVOY987/LoAD17Rz1JPkFxqUHvAadeOgmFoV04fpECAeC+zuXJ1bwDnbzw75GgNxwL0OR89hMk1q/776M4p2V19GIwkkROfeqwID1BnkzfxStppFFJRLw24jWJip41NfnsS7luNXdCnRquhQslsKKxqMfIGM5msBgcrSoZm3j5Vdm8DonAgIbJK5CD3qMssnvSNwAgODCy30/DVXfRJLqGOsVPsPW5mgJ+Z9nBUiZOXezRvLK6goQodFe+qZpXuVnBjdYN13jQ4s8x/M4yutcBjj636G1HbaG45aEDNwNqdx6ztx0SkDFrMlr6PMzX+8pCNG4Iim6p5e0kVKIZOCaBqZ7RJkXExr2EAAQrb4STBkmpL5ZiKskP8CtguerxetKEBO+08= subose@Sunandans-MacBook-Pro.local"
}

data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}
