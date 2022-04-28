#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SnsStack } from "../lib/sns-stack";
import { LambdaStack } from "../lib/lambda-stack";
import { EventBridgeStack } from "../lib/eventbridge-stack";
import { ChatBotStack } from "../lib/chatbot-stack";

const app = new cdk.App();
const projectName = app.node.tryGetContext("projectName");
const envKey = app.node.tryGetContext("env");
const envValues = app.node.tryGetContext(envKey);
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const snsStack = new SnsStack(app, `${projectName}-${envValues.envName}-sns-stack`, {
  projectName: projectName,
  envName: envValues.envName,
  env: env,
});

const lambdaStack = new LambdaStack(app, `${projectName}-${envValues.envName}-lambda-stack`, {
  projectName: projectName,
  envName: envValues.envName,
  env: env,
  snsTopicForHigh: snsStack.snsTopicForHigh,
  snsTopicForMiddleLow: snsStack.snsTopicForMiddleLow,
});

new EventBridgeStack(app, `${projectName}-${envValues.envName}-eventbridge-stack`, {
  projectName: projectName,
  envName: envValues.envName,
  env: env,
  lambdaFunction: lambdaStack.lambdaFunction,
});

new ChatBotStack(app, `${projectName}-${envValues.envName}-chatbot-stack`, {
  projectName: projectName,
  envName: envValues.envName,
  env: env,
  snsTopicForHigh: snsStack.snsTopicForHigh,
  snsTopicForMiddleLow: snsStack.snsTopicForMiddleLow,
  slackWorkspaceId: "your_workspace_id",
  slackChannelId1: "your_slackchannel_id",
  slackChannelId2: "your_slackchannel_id",
});
