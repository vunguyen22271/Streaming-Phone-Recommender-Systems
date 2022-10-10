from pyspark.sql import SparkSession
from pyspark.sql.functions import *
import pyspark.sql.functions as F 
from pyspark.sql.types import DoubleType
from pyspark.ml.feature import VectorAssembler
from pyspark.ml.feature import StandardScaler
from pyspark.sql.functions import col,isnan, when, count
from pyspark.sql.types import *

import numpy as np, pandas as pd
from tqdm import tqdm
import warnings
warnings.filterwarnings("ignore")

class PhoneSimilarity():
    def __init__(self, all_Data):
        self.all_Data_ = all_Data
    
    def phone_similarity(self, phone_id, amount=1):
        amount = amount + 1
        distances = []
        
        phone = self.all_Data_[(self.all_Data_._id == phone_id)].head(1).values[0]
        phone_row = self.all_Data_[(self.all_Data_._id == phone_id)].head(1)
        
        current_standardized_vector = phone[10].toArray()
        res_data = self.all_Data_[self.all_Data_._id != phone_id]
        countElement = 23 #23 of vector and 1 of predict
        for r_phone in tqdm(res_data.values):
            dist = 0
            standardized_vector = r_phone[10].toArray()
            for col in np.arange(23):
                dist = dist + np.square(float(current_standardized_vector[col]) - float(standardized_vector[col]))
            # dist = dist + np.square(float(phone[11]) - float(r_phone[11]))
            dist = dist / countElement
            dist = np.sqrt(dist)
            distances.append(dist)
        res_data['distance'] = distances
        phone_row['distance'] = 0
        res_data = res_data.sort_values('distance')
        bigdata = pd.concat([phone_row, res_data], ignore_index=True, sort=False)
        columns = ['_id', 'title', 'category', 'color', 'memory', 'pin', 'ram', 'screenSize', 'status', 'price','distance']
        return bigdata[columns][:amount]

def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb://admin:123@project-shard-00-00.u9pno.mongodb.net:27017,project-shard-00-01.u9pno.mongodb.net:27017,project-shard-00-02.u9pno.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pna2hx-shard-0&authSource=admin&retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['myFirstDatabase']

def foreach_batch_function(df,epoch_id,similarity_f,similarities_coll):
    if df.first() is not None:
        row = df.first()
        value = row['value'].decode("utf-8")
        first_element = value.split(',')[0]
        similarity_phones = similarity_f.phone_similarity(first_element, 10)
        listId = []
        for i in range(1,6):
            listId.append(similarity_phones['_id'][i])
        query = {"idProduct":first_element}
        dict1 = {"idProduct":first_element, "listId":listId}
        update = {"$set": dict1}
        similarities_coll.update_one(query,update,upsert=True)
        print(dict1)
        print(dict1)
    pass

if __name__ == "__main__":
    #Init Spark Session
    print('Start Spark')
    spark = SparkSession \
                .builder \
                .appName("Phone_Similarity") \
                .master("local[*]") \
                .getOrCreate()
            
    #set Log Level to only show ERROR
    spark.sparkContext.setLogLevel("ERROR")
    
    #get data from Mongo
    db = 'myFirstDatabase'
    tab = 'products'
    df = spark.read.format('com.mongodb.spark.sql.DefaultSource')\
                .option('spark.mongodb.input.uri','mongodb://admin:123@project-shard-00-00.u9pno.mongodb.net:27017,project-shard-00-01.u9pno.mongodb.net:27017,project-shard-00-02.u9pno.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-pna2hx-shard-0&authSource=admin&retryWrites=true&w=majority') \
                .option('spark.mongodb.input.database',db) \
                .option('spark.mongodb.input.collection',tab).load()
    df1 = df.withColumn('_id', col('_id').cast(StringType()))
    data = df1.withColumn('_id', split(col('_id'), ']').getItem(0))
    data = data.withColumn('_id', expr("substring(_id, 2, length(_id))"))
    phone_data = data.select('_id',
                            'title',
                            'category',
                            'color',
                            'memory',
                            'pin',
                            'ram',
                            'screenSize',
                            'status',
                            'price')

    #one hot decode for category
    print('start encode category to one hot 1/3')
    categ = phone_data.select('category').distinct().rdd.flatMap(lambda x:x).collect()
    exprs = [F.when(F.col('category') == cat,1).otherwise(0).alias(str(cat)) for cat in categ]
    phone_data = phone_data.select(exprs + phone_data.columns)
    print('category one hot encoded 1/3')
    
    #one hot decode for color
    print('start encode color to one hot 2/3')
    categ = phone_data.select('color').distinct().rdd.flatMap(lambda x:x).collect()
    exprs = [F.when(F.col('color') == cat,1).otherwise(0).alias(str(cat)) for cat in categ]
    phone_data = phone_data.select(exprs + phone_data.columns)
    print('color one hot encoded 2/3')

    #one hot decode for status
    print('start encode status to one hot 3/3')
    categ = phone_data.select('status').distinct().rdd.flatMap(lambda x:x).collect()
    exprs = [F.when(F.col('status') == cat,1).otherwise(0).alias(str(cat)) for cat in categ]
    phone_data = phone_data.select(exprs + phone_data.columns)
    print('status one hot encoded 3/3')

    #convert screenSize to Double
    changedTypedf = phone_data.withColumn("screenSize", phone_data["screenSize"].cast(DoubleType()))

    #convert phone_data to VectorAssembler
    assemble=VectorAssembler(inputCols=['99',
                                        'New',
                                        'Shiny Black',
                                        'Turquoise',
                                        'Silver',
                                        'Green',
                                        'Purple',
                                        'Blue',
                                        'White',
                                        'Gold',
                                        'Mint Green',
                                        'Black',
                                        'Red',
                                        'Pink',
                                        '6194877b0327b0eef3a53fe9',
                                        '61947f86613ccbeacb59e5b8',
                                        '619487730327b0eef3a53fe4',
                                        '61947f8e613ccbeacb59e5bd',
                                        'memory',
                                        'pin',
                                        'ram',
                                        'screenSize',
                                        'price'], outputCol='features')
    assembled_data=assemble.transform(changedTypedf)

    #scaling phone_data
    scale=StandardScaler(inputCol='features',outputCol='standardized')

    data_scale=scale.fit(assembled_data)
    data_scale_output=data_scale.transform(assembled_data)

    #convert phone_data to Pandas dataFrame
    datad = data_scale_output.select('_id', 'title', 'category', 'color', 'memory', 'pin', 'ram', 'screenSize', 'status', 'price', 'standardized')
    datf = datad.toPandas()

    #init PhoneSimilarity class
    similarity = PhoneSimilarity(datf)

    #init mongo connecter
    dbname = get_database()
    similarities_collection = dbname["similarities"]

    #init Kafka Consumer
    kafka_topic_name = "clickcount"
    kafka_bootstrap_servers = 'localhost:9092'

    #construct a streaming DataFrame that reads from topic
    flower_df = spark \
            .readStream \
            .format("kafka") \
            .option("kafka.bootstrap.servers", kafka_bootstrap_servers) \
            .option("subscribe", kafka_topic_name) \
            .option("startingOffsets", "latest") \
            .load()
    
    #run foreach_batch_function with each message received
    query = flower_df.writeStream.foreachBatch(lambda df,epochId: foreach_batch_function(df,epochId,similarity,similarities_collection)).start()

    query.awaitTermination()