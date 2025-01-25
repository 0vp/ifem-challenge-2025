import requests as req

url = "https://api.gumloop.com/api/v1/start_pipeline"

payload = {
  "user_id": "UV4SGMJ4dDgUIh1ou4Q0RyNMooB3",
  "saved_item_id": "5vL7EtBLrDkS2jpeVJTzAZ",
  "pipeline_inputs": [{"input_name":"input","value":"aid_instructions"},{"input_name":"prompt","value":""}]
}
headers = {
  "Authorization": "Bearer [INSERT GUMLOOP API KEY HERE, GENERATE FROM https://gumloop.com/credentials]",
  "Content-Type": "application/json"
}

response = req.request("POST", url, json=payload, headers=headers)

print(response.text)