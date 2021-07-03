from flask.json import jsonify
import pymongo
from pymongo import MongoClient
import json
import datetime as dt
import time
from hashlib import sha256
client = MongoClient('mongodb://localhost:27017/dbtests')
db = client.dbtests
db.test.create_index([('username', pymongo.ASCENDING)], unique=True)
db.testcode.create_index([('code', pymongo.ASCENDING)], unique=True)
db.testvip.create_index([('wam', pymongo.ASCENDING)], unique=True)

def adduser():
    try:
        db.test.insert_one(
            {
                'username':'aaaa',
                'password': 'ooppy',
                'wid':[{'id':"eiei.wam",'vip':"0"},{'id':"sss.wam",'vip':"0"}]
            }
        )
    except pymongo.errors.DuplicateKeyError:
            print("dup username")

def addcode():
    try:
        db.testcode.insert_one(
            {
                'code':'lazy-01-50',
                'hash':'0cb68ad96dbbe62f9c23af0f58abe3eb57c06713a2c4aba777c2018dd8d93eb2',
                'wam': [],
                'count': 50,
                'start' : dt.datetime.today(),
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

def update():
    db.test.update_one({'username' : 'aaaa'},{'$push':{'wid':{'id':"eieiman.wam",'vip':"0"}}} )

def addwam():
    db.test.update_one({'username' : 'aaaa'},{'$push':{'wid':{'id':'oiuy.wam','vip':"0"}}} )

def delet():
    db.test.update({'username' : 'aaaa'},{'$pull':{'wid':{'id':"eieiman.wam"}}} )

def addnonce():
    #dataA = db.test.find_one({"username": "saad"},{'wid.nonce':"eieiman.wam"})

    db.test.update_one({'$and': [{'username':'saad'},{'wid.id':"eiei.wam"}]},{'$set':{'wid.$.nonce':'safgdsagsdfg'}})
    #dataA = db.test.find_one({'$and': [{'username':'aaaa'},{'wid.id':"eiei.wam"}]})

def addvipwam():
    for x in range(10):

        try:
            db.testvip.insert_one(
                {
                    'wam':'test0'+ str(x),
                    'nonce':'default',
                }
            )
        except pymongo.errors.DuplicateKeyError:
                print("dup wam")
def testhash():
    input = ('lazy-01-50')
    hashe = sha256(input.encode('utf-8')).hexdigest()
    print(hashe)
    hashe = hashe[:13]
    print(hashe)

def find13():
    code = '0cb68ad96dbbe'
    dataA = db.testcode.find_one({ 'hash': { '$regex': code } })
    if dataA is None:
        print("code pid")
    else:
        count = dataA['count']
        leng = len(dataA['wam'])
        if leng >= count :
            print('full vip')
        else : 
            db.testcode.update_one({ 'hash': { '$regex': code } },{'$push':{'wam':'123.wam'}})
        print(leng)
        print(dataA)

def reqnonce():
    wid = 'test05'
    dataA = db.testvip.find_one({"wam": wid })
    print(json.dumps(dataA['nonce']))

def reqwam ():
    dataA = db.test.find_one({'username':'aaaa'})
    yo = dataA['wid']
    json.dumps(yo)
    print(yo)
    print(dataA['wid'])

def teste():
    yo = ["wqobq.wam","1234a.wam"]
    for i in range(len(yo)) :
        print(i)



# In[ ]:
if __name__ == '__main__':
    teste()  
