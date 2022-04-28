import json
import os

import boto3

SNS_TOPIC_ARN_HIGH = os.environ["SNS_TOPIC_ARN_HIGH"]
SNS_TOPIC_ARN_MIDDLE_LOW = os.environ["SNS_TOPIC_ARN_MIDDLE_LOW"]
client = boto3.client("sns")


def lambda_handler(event, context):

    high_list = ["Exfiltration:S3/ObjectRead.Unusual"]
    message = json.dumps(event)
    if event["detail"]["severity"] >= 7 or event["detail"]["type"] in high_list:
        client.publish(TopicArn=SNS_TOPIC_ARN_HIGH, Message=message)
    else:
        client.publish(TopicArn=SNS_TOPIC_ARN_MIDDLE_LOW, Message=message)
