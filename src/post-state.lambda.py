import os
import boto3
import json

INSTANCE_ID = os.environ.get('INSTANCE_ID', 'i-xxxxxxxxxxxxxxxxx')
REGION = os.environ.get('AWS_REGION', 'us-east-1')

ec2 = boto3.client('ec2', region_name=REGION)

def lambda_handler(event, context):
    try:
        # Parse the request body
        body = event.get('body')
        if body:
            body = json.loads(body)
        else:
            return _response(400, {'error': 'No body provided'})

        state = body.get('state')
        if state not in ['on', 'off']:
            return _response(400, {'error': "State must be 'on' or 'off'"})

        if state == 'on':
            ec2.start_instances(InstanceIds=[INSTANCE_ID])
            action = 'starting'
        else:
            ec2.stop_instances(InstanceIds=[INSTANCE_ID])
            action = 'stopping'

        return _response(200, {'success': True, 'action': action})

    except Exception as e:
        return _response(500, {'error': str(e)})

def _response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        },
        'body': json.dumps(body)
    }
