import { readFile } from "node:fs/promises";
import { marshall } from '@aws-sdk/util-dynamodb'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

const serviceName = process.env.SERVICE_NAME
const stage = process.env.STAGE
const seedPath = process.argv[2]
const tableName = process.argv[3]
const region = "ap-northeast-1"
if (!serviceName || !seedPath || !tableName) {
	console.error("SERVICE_NAME=<service-name> STAGE=<stage> npx ts-node ./hack/seed.ts <seed-json-file-path> <table-name>")
	process.exit(1)
}

const ddbClient = new DynamoDBClient({ region: region });
const run = async () => {
	try {
		const seedJSONFile = await readFile(seedPath)
		const items = JSON.parse(String(seedJSONFile))
		for (const item of items) {
			const params = {
				TableName: `${serviceName}-${stage}-${tableName}`,
				Item: marshall(item),
			};
			console.log(`inserting data: ${JSON.stringify(marshall(item))}`)
			await ddbClient.send(new PutItemCommand(params));
		}
	} catch (err) {
		console.log("Error", err);
	}
};
run()
