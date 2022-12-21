#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { UsesLevel1Stack } from '../lib/uses-level1';
import { UsesLevel2Stack } from '../lib/uses-level2';

const app = new cdk.App();

new UsesLevel1Stack(app, 'UsesLevel1Stack', {
	env: {
		region: 'eu-west-1',
	},
	replicationRegion: 'us-east-1',
});

new UsesLevel2Stack(app, 'UsesLevel2Stack', {
	env: {
		region: 'eu-west-1',
	},
	replicationRegion: 'us-east-1',
});
