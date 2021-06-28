import pymongo
from pymongo import MongoClient
import json
import datetime as dt
import time

client = MongoClient('mongodb://localhost:27017/dbtests')
db = client.dbtests
db.test.create_index([('username', pymongo.ASCENDING)], unique=True)
db.testcode.create_index([('code', pymongo.ASCENDING)], unique=True)

def adduser():
    try:
        db.test.insert_one(
            {
                'name':'test01',
                'username':'ooppu',
                'password': 'ooppy',
                'email': 'eiei@gmail.com',
                'aid':["eiei.wam"],
                'idcount': 1 ,
                'nonce':["non"],
                'vip':[0]
            })
    except pymongo.errors.DuplicateKeyError:
            print("dup username")

def addcode():
    try:
        db.testcode.insert_one(
            {
                'code':'aaaaaaaa',
                'maxnuse': [0,0],
                'date': dt.datetime.today(),
                'active' : 'x',
                'stop' : 'x',
            }
        )
    except : print("dup username")

def dat():
    dataA = db.test.find({"username": "ooppu"})
    for item in dataA:
        temp = int(item['idcount'])
        temp +=1
        print(temp)

def dat2():
    dataA = db.test.find_one({"username": "ooppu","aid":'sadasd.wam'})
    if dataA is None:
        print("nulssl")
    else:
        print(dataA)

# In[ ]:
if __name__ == '__main__':
    dat2()  
