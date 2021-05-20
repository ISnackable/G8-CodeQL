console.log("-----------------------------------------");
console.log("Class: DISM/FT/3A/03")
console.log("-----------------------------------------");
console.log("DISM FYP 2021 GRP 8")
console.log("-----------------------------------------");

// ---------------------------------------------------------
// load modules
// ---------------------------------------------------------

// Neo4J Database
const neo4j = require('neo4j-driver')

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()
const personName = 'Alice'

try {
  const result = await session.run(
    'CREATE (a:Person {name: $name}) RETURN a',
    { name: personName }
  )

  const singleRecord = result.records[0]
  const node = singleRecord.get(0)

  console.log(node.properties.name)
} finally {
  await session.close()
}

// on application exit:
await driver.close()


// ---------------------------------------------------------
// export
// ---------------------------------------------------------
module.exports = conn;

