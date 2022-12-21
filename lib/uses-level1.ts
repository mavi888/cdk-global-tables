import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createTable } from './level1';

interface UsesLevel1StackProps extends cdk.StackProps {
	env: any;
	replicationRegion: string;
}

export class UsesLevel1Stack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: UsesLevel1StackProps) {
		super(scope, id, props);

		const region = props.env.region;

		const table = createTable(this, {
			region: region,
			tableName: 'test-table-level1',
			replicationRegion: props.replicationRegion,
		});
	}
}
