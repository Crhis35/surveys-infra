resource "azurerm_resource_group" "resource_group" {
  name     = local.rg_name
  location = local.location
}


resource "random_integer" "ri" {
  min = 10000
  max = 99999
}
