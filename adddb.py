#from flask.json import jsonify
import pymongo
from pymongo import MongoClient
import json
import datetime as dt
import time
from hashlib import sha256
import asyncio
import requests
import random
import urllib
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
        date_1 = dt.datetime.today()
        date_2 = date_1 + dt.timedelta(days=30)
        db.testcode.insert_one(
            {
                'code':'lazy-01-1000',
                'hash':'9868ae39f27ead85e6dd382e3cccc1f7efdaec0852e2daecfcc3c92ac5c5a366',
                'wam': [],
                'count': 1000,
                'start' : date_1,
                'stop' : date_2,
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
    dataA = db.test.find_one({'$and': [{'username':'asdsad'},{'wid.id': 'poipoi.wam'}]})
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

def dwoi():
    dataC = list(db.testcode.find({'hash':{'$regex':"9868ae39f27ea"}}))
    a = []
    for item in dataC :
        a.append(item['start'])
        b = item['start']
        print(item['start'])
        print(b)

    #db.testvip.delete_many({"wam": "gvaeu.wam"})
    #db.testvip.update_one({'wam' : "gvaeu.wam"},{'$set':{'nonce':"eoeoeoeo"}})

def testquery():
    wam = []
    nonce = []
    dataA = list(db.testvip.find())
    for item in dataA :  
        wam.append(item['wam']) 
        nonce.append(item['nonce'])
    try:      
        for x in range(len(wam))  :
            url = 'http://139.180.187.234/mine_worker?account='+wam[x]+'&nonce='+nonce[x] 
            r = requests.get(url)
            texxt = r.text
            print(r.text) 
            if len(texxt) >= 20 :
                pass
            else : 
                db.testvip.update_one({'wam' : wam[x]},{'$set':{'nonce':texxt}})
    except :
        pass            
    #print(wam)
    #print(nonce)

def getallvip():
    wam = []
    nonce = []
    dataA = list(db.testvip.find())
    for item in dataA :  
        wam.append(item['wam']) 
        nonce.append(item['nonce'])
    #print(wam)
    #print(nonce)
    x = zip(wam,nonce)
    #print(tuple(x))

    a = set(x)

    print(a)

def dwoi3():
    y = []
    dataA = db.testcode.find()
    for item in dataA :
        y.append(item['code'])
    print(y)

def dwoi4():
    y =[]
    dataA = db.testcode.find({'code': 'lazy-01-50' })
    for item in dataA :
        item = str(item)
        y.append(item)
    x =json.dumps(y)
    print (y)
    print (x)

def delcode ():
    code = "lazy01-10"
    y = []
    try :
        dataA = db.testcode.find({'code': code })
        for item in dataA :
            y = (item['wam'])
        #print(y[0])
        for i in range(len(y)) :
            dataB = db.test.find_one({'wid.id': y[i]})
            if dataB == None :
                print("error wam wtf")
            else :
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.vip':0}})
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.code':""}})
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.vipstart':""}})
                db.test.update_one({'wid.id': y[i]},{'$set':{'wid.$.vipend':""}})
                db.testvip.delete_one({'wam': y[i]})
                db.testcode.delete_one({ 'code': { '$regex': code }})
                print(dataB)
            print(y[i])
        print("success")
    except : 
        texxt = 'code not found'
        print(texxt)
    

def dwoi2 ():
    text = ['yoyo','momo','mama','meme']
    yoe = random.choice(text)+'dlub'
    print(yoe)

def dwoi9 ():
    db.test.update_one({'wid.id':"ujaeu.wam"},{'$set':{'wid.$.vip':0}})
    db.test.update_one({'wid.id':"ujaeu.wam"},{'$set':{'wid.$.code':""}})
    db.test.update_one({'wid.id':"ujaeu.wam"},{'$set':{'wid.$.vipstart':""}})
    db.test.update_one({'wid.id':"ujaeu.wam"},{'$set':{'wid.$.vipend':""}})

# In[ ]:
if __name__ == '__main__':
    delcode()  
