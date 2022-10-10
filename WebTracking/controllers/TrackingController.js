const Tracking = require('../models/TrackingModel')
//const Products = require('../models/ProductModel')
const { Kafka } = require('kafkajs')

const TrackingControl = {
    getTrackings: async (req,res) =>{
        try {
            const trackings =  await Tracking.find()
            res.json(trackings)

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    },
    saveTrackings: async (req, res) =>{
        try {
            const{id_user, id_product} = req.body
            const newTrackings = new Tracking({id_user, id_product})
            await newTrackings.save()
            res.json({msg: "Save success"})

            // kafka
            
            const kafka = new Kafka({
                clientId: 'my-app',
                brokers: ['localhost:9092']
              })
              const producer = kafka.producer()
              const producerMessage = async()=>{
              
              
              console.log(id_product)

              try {
                  await producer.send({
                      topic: 'clickcount',
                      messages: [
                        {value: id_product},
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
              producerMessage()
            }
            
            run().catch(console.error)
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = TrackingControl;