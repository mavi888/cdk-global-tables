import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { createTable } from './level2';

interface UsesLevel2StackProps extends cdk.StackProps {
	env: any;
	replicationRegion: string;
}

export class UsesLevel2Stack extends cdk.Stack {
	constructor(scope: Construct, id: string, props: UsesLevel2StackProps) {
		super(scope, id, props);

		const region = props.env.region;

		const table = createTable(this, {
			region: region,
			tableName: 'test-table-level2',
			replicationRegions: [props.replicationRegion],
		});
	}
}
