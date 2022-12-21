import { Construct } from 'constructs';

import {
	Attribute,
	CfnGlobalTable,
	ITable,
	Table,
} from 'aws-cdk-lib/aws-dynamodb';
import { CfnOutput, RemovalPolicy } from 'aws-cdk-lib';

interface CreateTableProps {
	region: string;
	tableName: string;
	replicationRegion: string;
}

export function createTable(scope: Construct, props: CreateTableProps): ITable {
	// Create global table if we are in the main region
	if (props.region === 'eu-west-1') {
		const globalTable = new CfnGlobalTable(
			scope,
			`GlobalTable-${props.tableName}`,
			{
				tableName: props.tableName,
				attributeDefinitions: [
					{
						attributeName: 'pk',
						attributeType: 'S',
					},
				],
				keySchema: [
					{
						attributeName: 'pk',
						keyType: 'HASH',
					},
				],
				billingMode: 'PAY_PER_REQUEST',

				streamSpecification: {
					streamViewType: 'NEW_AND_OLD_IMAGES',
				},
				replicas: [
					{
						region: props.region,
						pointInTimeRecoverySpecification: {
							pointInTimeRecoveryEnabled: true,
						},
					},
					{
						region: props.replicationRegion,
						pointInTimeRecoverySpecification: {
							pointInTimeRecoveryEnabled: true,
						},
					},
				],
			}
		);

		globalTable.applyRemovalPolicy(RemovalPolicy.RETAIN);

		new CfnOutput(scope, `CFOutput-${props.tableName}`, {
			value: globalTable.attrArn,
		});
	}

	return Table.fromTableName(scope, `${props.tableName}`, props.tableName);
}
