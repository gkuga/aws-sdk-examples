require "aws-sdk-lambda"
require "json"

client = Aws::Lambda::Client.new(
  endpoint: 'http://localhost:8080',
)

response = client.invoke(
	# function name is `function` in AWS Lambda Runtime Interface Emulator
  function_name: 'function',
  invocation_type: 'Event',
  log_type: 'Tail',
  payload: JSON.generate({
    foo: {
      bar: 'baz',
    }
 })
)

p response
