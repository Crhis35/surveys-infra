locals {
  enabled_services = [
    "aks",
    "web_app"
  ]
  rg_name  = "rg_surveys_test"
  location = "eastus"
}
