// const { Kafka } = require('kafkajs')
// const control = require('../controllers/UserControl')

// const value = control.productId()
// console.log(value)
// //const Chance = require('chance')

// //const chance = new Chance()

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
  })
  const producer = kafka.producer()
  const producerMessage = async()=>{
  console.log(value)
  try {
      await producer.send({
          topic: 'test-topic',
          messages: [
            {value},
          ],
          timestamp: Date.now(),
        })       
      } catch (error) {
      console.log(error)
    }
  }
  const run = async () => {
// Producing
   await producer.connect()
  setInterval(producerMessage, 5000)
}

run().catch(console.error)    
  /**
   * thì em xử lý kafka trong này luôn trong hàm productId này luôn hả a
   * có vấn đề gì đâu. Tại e cứ tưởng controller như cái API thích gọi chỗ nào khác cũng dc ai dè khó quá 
   * vậy chiến tiếp đi nhé
   *  dạ dạ em cảm ơn a nhiều hehe
   */

// // const test =[{'id':1, 'name':'My'},
// //              {'id':2, 'name':'Hi'},
// //              {'id':3, 'name':'Hello'},
// //              {'id':4, 'name':'App'},
// //              {'id':5, 'name':'Pro'},
// //              {'id':6, 'name':'Male'},
// //              {'id':7, 'name':'Fmale'},
// // ]

// const kafka = new Kafka({
//   clientId: 'my-app',
//   brokers: ['localhost:9092']
// })
 
// const producer = kafka.producer()
// //const consumer = kafka.consumer({ groupId: 'test-group' })
// const producerMessage = async()=>{
//     //const value = chance.city()
//     //const value = test.forEach(t =>t.name.toString())
//     //console.log(typeof value)
//     //const counter = "1"
//     console.log(value)
//     try {
//         await producer.send({
//             topic: 'test-topic',
//             messages: [
//               {value},
//             ],
//           })        
//     } catch (error) {
//         console.log(error)
//     }
// }
// const run = async () => {
//   // Producing
//   await producer.connect()
//   setInterval(producerMessage, 1000)
// }
 
// run().catch(console.error)