# Specify AWS provider and preferred region
provider "aws" {
  region = "us-east-1" # update to your preferred AWS region
}

# IAM Role for Lambda Execution
resource "aws_iam_role" "lambda_exec_role" {
  name = "lambda_exec_role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Principal = {
          Service = "lambda.amazonaws.com"
        },
        Effect = "Allow",
        Sid    = ""
      }
    ]
  })
}

# Attach AWS managed policy for Lambda execution
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Lambda Function
resource "aws_lambda_function" "scrape_menu" {
  filename         = "${path.module}/scrape_menu_lambda.zip"  # path to the zip file
  function_name    = "ScrapeMenuLambda"
  role             = aws_iam_role.lambda_exec_role.arn
  handler          = "scrape_menu.lambda_handler"  # update to your entry function (e.g., lambda_handler)
  runtime          = "python3.9"
  source_code_hash = filebase64sha256("scrape_menu_lambda.zip")

  environment {
    variables = {
      MONGO_URI      = <we had our keys here!>       
      USDA_API_KEY   =  <we had our keys here!> 
    }
  }
}

# EventBridge Rule for Scheduling Lambda at 2 AM EST Daily
resource "aws_cloudwatch_event_rule" "daily_lambda_trigger" {
  name                = "DailyLambdaTrigger"
  schedule_expression = "cron(0 7 * * ? *)"  # 2 AM EST is 7 AM UTC
}

# Permission for EventBridge to invoke Lambda
resource "aws_lambda_permission" "allow_eventbridge" {
  statement_id  = "AllowExecutionFromEventBridge"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.scrape_menu.function_name
  principal     = "events.amazonaws.com"
  source_arn    = aws_cloudwatch_event_rule.daily_lambda_trigger.arn
}

# EventBridge Target to Trigger Lambda
resource "aws_cloudwatch_event_target" "trigger_lambda" {
  rule      = aws_cloudwatch_event_rule.daily_lambda_trigger.name
  target_id = "ScrapeMenuLambda"
  arn       = aws_lambda_function.scrape_menu.arn
}
