import os
import boto3
import json

INSTANCE_ID = os.environ.get('INSTANCE_ID', 'i-xxxxxxxxxxxxxxxxx')
REGION = os.environ.get('AWS_REGION', 'us-east-1')

ec2 = boto3.client('ec2', region_name=REGION)

def lambda_handler(event, context):
    try:
        response = ec2.describe_instances(InstanceIds=[INSTANCE_ID])
        instance = response['Reservations'][0]['Instances'][0]
        state = instance['State']['Name']  # e.g., 'running', 'stopped'
        public_ip = instance.get('PublicIpAddress', None)

        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # Or your domain for production
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'state': state,
                'public_ip': public_ip
            })
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'error': str(e)})
        }
