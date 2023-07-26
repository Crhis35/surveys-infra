terraform {
  backend "azurerm" {
    resource_group_name  = "rg-surveys-test"
    storage_account_name = "aztestdevtfstate8925"
    container_name       = "tfstate"
    key                  = "terraform.tfstate"
  }
}
