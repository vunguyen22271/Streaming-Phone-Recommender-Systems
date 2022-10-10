const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-consumer',
  brokers: ['localhost:9092']
})
 
const consumer = kafka.consumer({groupId: 'my-consumer'})

const run = async () => {
  // Consumer
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: false })
 
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        offset: message.offset,
        value: message.value.toString(), 
        // timestamp: message.timestamp.date.toString()
        //value: JSON.parse(message.value),
      })
    },
  })
}
 
run().catch(console.error)